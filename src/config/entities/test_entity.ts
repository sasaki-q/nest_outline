import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Test{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: number;

    @Column()
    item_name: String;

    @Column({nullable: true})
    system_name: String;

}