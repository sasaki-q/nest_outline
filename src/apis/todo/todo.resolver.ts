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
    async todos(): Promise<Todo[]> {
        return await this.todoService.todos();
    }

    @Query(() => Todo)
    async todo(@Args({name: "id", type: () => Number}) id: number): Promise<Todo> {
        return await this.todoService.todo(id)
    }

    @Mutation(() => Todo)
    async create(@Args({name: "data", type: () => DataType}) data: DataType): Promise<Todo> {
        return await this.todoService.create(data)
    }

    @Mutation(() => Boolean)
    async delete(@Args({name: "id", type: () => Number}) id: number): Promise<boolean> {
        return await this.todoService.delete(id);
    }
}