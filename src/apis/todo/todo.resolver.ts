import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { createArgOpts } from 'src/helper/createArgOpts';
import { DataType } from './dto';
import { Todo } from './entity';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService
    ){}

    @Query(() => [Todo])
    async todos(): Promise<Todo[]> {
        return await this.todoService.todos();
    }

    @Query(() => Todo)
    async todo(@Args(createArgOpts("id", Int, true)) id: number): Promise<Todo> {
        return await this.todoService.todo(id)
    }

    @Mutation(() => Todo)
    async create(@Args(createArgOpts("data", DataType, false)) data: DataType): Promise<Todo> {
        return await this.todoService.create(data)
    }
    // mutation {
    //     create(
    //       data: {
    //         uid: 25, 
    //         title: "graohql title ver2", 
    //         content: "graphql content ver 2"
    //       }) {
    //       id
    //       uid
    //       title
    //       createdAt
    //     }
    // }

    @Mutation(() => Boolean)
    async delete(@Args(createArgOpts("id", Int, false)) id: number): Promise<boolean> {
        return await this.todoService.delete(id);
    }
}