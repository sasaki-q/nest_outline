import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, QueryRunner, Repository } from 'typeorm';
import { User } from './entity';
import { CreateUserDto, ResponseDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        private readonly connection: Connection,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async getUserTodo(uid: number): Promise<User> {
        try{
            // const user: User[] = await this.userRepository.query(`
            //     SELECT *, U.id AS user_id, GROUP_CONCAT(T.title, T.content, T.is_done)
            //     FROM users AS U
            //     LEFT JOIN todos AS T
            //     ON U.id = T.uid
            //     WHERE U.id = ?
            // `, [uid])
            const user: User[] = await this.userRepository.find({
                relations: ["todos"],
                where: {
                    id: uid
                }
            });
            return user[0];
        }catch(err){
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException()
        }
    }

    async create (req: CreateUserDto): Promise<ResponseDto> {
        const { name, role } = req;
        const user: User = new User()
        const runner: QueryRunner = this.connection.createQueryRunner()
        await runner.connect()
        await runner.startTransaction()
        try {
            this.userRepository.merge(user, {name: name, role: role})
            await runner.manager.save(user)
            const users: User[] = await runner.manager.find(User);
            await runner.commitTransaction()
            return {statusCode: 200, users: users}
        } catch(err) {
            console.log("DEBUG: error message === ", err)
            await runner.rollbackTransaction()
            throw new InternalServerErrorException()
        } finally {
            await runner.release()
        }
    }
}
