import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Mutation, Query } from "@nestjs/graphql"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataType } from './dto';
import { Todo } from './entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepo: Repository<Todo>
    ){}

    @Query(() => [Todo])
    async todos (): Promise<Todo[]> {
        return await this.todoRepo.find()
    }

    @Query(() => Todo)
    async todo(id: number): Promise<Todo> {
        try {
            const todoInfo = await this.todoRepo.findOne(id)
            if(!todoInfo) {
                throw 404;
            }
            return todoInfo;
        }catch(err) {
            console.log("DEBUG error message === ", err)
            if( err === 404 ) throw new NotFoundException();
            throw new InternalServerErrorException();
        }
    }

    @Mutation(() => Todo)
    async create(data: DataType): Promise<Todo> {
        const { uid, title, content } = data
        const todo = new Todo()
        this.todoRepo.merge(todo, {uid: uid, title: title, content: content})
        try{
            const todoInfo: Todo = await this.todoRepo.save(todo);
            return todoInfo
        }catch(err) {
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException();
        }
    }

    @Mutation(() => Boolean)
    async delete(id: number): Promise<boolean> {
        try{
            // res → DeleteResult { raw: [], affected: 1 }
            const res = await this.todoRepo.delete(id)
            return res.affected > 0
        }catch(err) {
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException();
        }
    }
}
