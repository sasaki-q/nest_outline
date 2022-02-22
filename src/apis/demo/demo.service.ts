import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { Connection } from 'typeorm';
import { DemoTransactionDto } from './dto';

@Injectable()
export class DemoService {
    constructor(private connection: Connection){}

    async typeormTransaction(req: DemoTransactionDto){
        const {id, uid} = req;
        const firstSql = "SELECT * FROM user WHERE id = $1"
        const secondSql = "SELECT * FROM user WHERE uid = $1"

        const queryRunner = this.connection.createQueryRunner()

        try{
            await queryRunner.connect();
            await queryRunner.startTransaction()

            await queryRunner.query(firstSql, [id])
            await queryRunner.query(secondSql, [uid])

            await queryRunner.commitTransaction();
            return { statusCode: 200, result: "success" }
        }catch(err){
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException()
        }finally{
            queryRunner.release()
        }
    }

    async anotherTypeormTransaction(req: DemoTransactionDto){
        let user1, user2;
        const {id, uid} = req;
        const firstSql = "SELECT * FROM user WHERE id = $1"
        const secondSql = "SELECT * FROM user WHERE uid = $1"
        try{
            await this.connection.transaction(async manager => {
                user1 = await manager.query(firstSql, [id]);
                user2 = await manager.query(secondSql, [uid]);
            })
            return { statusCode: 200, result: "success" }
        }catch(err){
            throw new InternalServerErrorException()
        }
    }
}
