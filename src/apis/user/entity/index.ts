import { ApiProperty } from "@nestjs/swagger";
import { Todo } from "src/apis/todo/entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../type";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    @ApiProperty({type: Number})
    id: number;

    @Column({ type: "char", length: 255 })
    @ApiProperty({type: String})
    name: string;

    @Column({ name: "is_active", type: "boolean"})
    @ApiProperty({type: Boolean})
    isActive: boolean

    @Column({
        type: "enum",
        enum: UserRole
    })
    @ApiProperty({enum: UserRole})
    role: UserRole

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({type: Date})
    createdAt: Date

    @OneToMany(() => Todo, todo => todo.user, {
        persistence: false,
        createForeignKeyConstraints: false,
    })
    @ApiProperty({type: [Todo]})
    todos?: Todo[]
}