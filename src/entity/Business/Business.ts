// import { Merchant } from "./../Merchant/Merchant";
import {Entity, Column, OneToMany } from "typeorm";
import { IsEmail, IsString, Matches } from "class-validator";
import Base from "../Base/Base";
import User from "../User/User";
import { IUser } from "../User/type";

export type IBusiness = {    
    id: string;
    title: string;
    slug: string;
    phone: string;
    email: string;
    desciprtion: string;
    merchant: IUser[];
}


@Entity()
export class Business extends Base implements IBusiness {
    
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

    @OneToMany(() => User, user => user.business)
    merchant: User[];
}