import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { pool } from 'src/config/db';
import { getConnection } from 'typeorm';
import { DemoTransactionDto } from './dto';

@Injectable()
export class DemoService {
    async transaction(req: DemoTransactionDto){
        const {id, uid} = req;
        console.log(id, uid)
        const firstSql = "SELECT * FROM user WHERE id = $1"
        const secondSql = "SELECT * FROM user WHERE uid = $1"
        const transactionPool = await pool.connect();
        try{
            await transactionPool.query("BEGIN");
            let firstUser = await transactionPool.query(firstSql, [id])
            let secondUser = await transactionPool.query(secondSql, [uid])
            await transactionPool.query("COMMIT")
            return { statusCode: 200, result: "success"}
        }catch(err){
            await transactionPool.query("ROLLBACK")
            throw new InternalServerErrorException()
        }finally{
            transactionPool.release();
        }
    }

    async typeormTransaction(req: DemoTransactionDto){
        const {id, uid} = req;
        console.log(id, uid)
        const firstSql = "SELECT * FROM user WHERE id = $1"
        const secondSql = "SELECT * FROM user WHERE uid = $1"

        const connection = getConnection();
        const queryRunner = connection.createQueryRunner()

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
}
