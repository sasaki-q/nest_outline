import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}