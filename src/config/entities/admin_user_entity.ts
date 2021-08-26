import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AdminUser{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: String;

    @Column()
    password: String;
}