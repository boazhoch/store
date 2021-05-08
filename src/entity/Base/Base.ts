import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Base {
    @PrimaryGeneratedColumn("uuid")
    id: string;
}