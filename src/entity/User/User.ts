import { IAddressEntity } from "./../Address/Address";
import { IsBoolean, IsEmail, IsString } from "class-validator";
import {
	Entity, Column, OneToOne, JoinColumn,
} from "typeorm";
import { IUser } from "./type";
import { Match } from "../../services/validation/addons";
import AddressEntity from "../Address/Address";
import DateEntity from "../Date/Date";

export enum UserRoles {
    User,
    Merchant,
    Admin
}

@Entity()
export default class User extends DateEntity implements IUser {
    @Column("text")
    @IsString()
    firstName: string;

    @Column("text")
    @IsString()
    lastName: string;

    @Column("text", {unique: true})
    @IsEmail()
    eamil: string;

    @Column("text")
    @IsString()
    password: string;

    @IsString()
    @Match("password")
    confirmPassword: string;

    @OneToOne(() => AddressEntity)
    @JoinColumn()
    address: IAddressEntity;

    @Column("text")
    role: UserRoles

    @Column()
    @IsBoolean()
    isAdmin: boolean;
}