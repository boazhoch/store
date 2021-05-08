import { Merchant } from "./../Merchant/Merchant";
import {Entity, Column, OneToMany, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import { IsEmail, IsString, Matches } from "class-validator";
import Base from "../Base/Base";

export type IBussiness = {    
    id: string;
    title: string;
    slug: string;
    phone: string;
    email: string;
    desciprtion: string;
    merchant: Merchant[];
}


@Entity()
export class Business extends Base implements IBussiness {
    
    @Column()
    @IsString()
    title: string;

    @Column({unique: true})
    @Matches(RegExp(/^([a-z])[a-z0-9-]*$/))
    slug: string;

    @Column()
    @IsString()
    phone: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    desciprtion: string;

    @OneToMany(() => Merchant, merchant => merchant.bussiness)
    merchant: Merchant[];
}