import { IsDate } from "class-validator";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import Base from "../Base/Base";

@Entity()
export default class DateEntity extends Base {

    @Column("date")
    @CreateDateColumn()
    @IsDate()
    createdAt: Date;

    @Column("date")
    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date;
}