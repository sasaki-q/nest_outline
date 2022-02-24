import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../type";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "char", length: 255 })
    name: string;

    @Column({ name: "is_active", type: "boolean"})
    isActive: boolean

    @Column({
        type: "enum",
        enum: UserRole
    })
    role: UserRole

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date
}