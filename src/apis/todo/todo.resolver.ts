import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DataType } from './dto';
import { Todo } from './entity';
import { TodoService } from './todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService
    ){}

    @Query(() => [Todo])
    async getTodos(): Promise<Todo[]> {
        return await this.todoService.findAll();
    }

    @Query(() => Todo)
    async getTodo(@Args({name: "id", type: () => Number}) id: number): Promise<Todo> {
        return await this.todoService.findTodo(id)
    }

    @Mutation(() => Boolean)
    async createTodo(@Args({name: "data", type: () => DataType}) data: DataType): Promise<boolean> {
        return await this.todoService.create(data)
    }

    @Mutation(() => Boolean)
    async delete(@Args({name: "id", type: () => Number}) id: number): Promise<boolean> {
        return await this.todoService.delete(id);
    }
}