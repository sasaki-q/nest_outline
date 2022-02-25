import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/apis/user/entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "todos"})
export class Todo {
    @PrimaryGeneratedColumn({type: "int"})
    @ApiProperty({type: Number})
    id: number;

    @Column({type: "int"})
    @ApiProperty({type: Number})
    uid: number;

    @Column({type: "char"})
    @ApiProperty({type: String})
    title: string;

    @Column({type: "char"})
    @ApiProperty({type: String})
    content: string;

    @Column({name: "is_done", type: "boolean"})
    @ApiProperty({type: Boolean})
    isDone: string;

    @CreateDateColumn({name: "created_at", type: "datetime"})
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