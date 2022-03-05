import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/apis/user/entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "todos"})
@ObjectType()
export class Todo {
    @PrimaryGeneratedColumn({type: "int"})
    @Field()
    @ApiProperty({type: Number})
    id: number;

    @Column({type: "int"})
    @Field()
    @ApiProperty({type: Number})
    uid: number;

    @Column({type: "char"})
    @Field()
    @ApiProperty({type: String})
    title: string;

    @Column({type: "char"})
    @Field()
    @ApiProperty({type: String})
    content: string;

    @Column({name: "is_done", type: "boolean"})
    @Field()
    @ApiProperty({type: Boolean})
    isDone: string;

    @CreateDateColumn({name: "created_at", type: "datetime"})
    @Field()
    @ApiProperty({type: Date})
    createdAt: Date

    @ManyToOne(() => User, user => user.todos, {
        persistence: false,
        createForeignKeyConstraints: false,
    })
    @JoinColumn({ name: "uid", referencedColumnName: "id", })
    @ApiProperty({type: () => User})
    readonly user: User;
}