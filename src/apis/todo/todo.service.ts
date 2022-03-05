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
    async findAll (): Promise<Todo[]> {
        return await this.todoRepo.find()
    }

    @Query(() => Todo)
    async findTodo(id: number): Promise<Todo> {
        try {
            const todoInfo = await this.todoRepo.findOne(id)
            if (todoInfo) {
                throw new NotFoundException()
            }
            return todoInfo;
        }catch(err) {
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException();
        }
    }

    @Mutation(() => Boolean)
    async create(data: DataType): Promise<boolean> {
        const { uid, title, content } = data
        const todo = new Todo()
        this.todoRepo.merge(todo, {uid: uid, title: title, content: content})
        try{
            await this.todoRepo.save(todo);
            return true
        }catch(err) {
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException();
        }
    }

    @Mutation(() => Boolean)
    async delete(id: number): Promise<boolean> {
        try{
            const res = await this.todoRepo.delete(id)
            console.log(res, res.affected)
            return res.affected > 0
        }catch(err) {
            console.log("DEBUG error message === ", err)
            throw new InternalServerErrorException();
        }
    }
}
