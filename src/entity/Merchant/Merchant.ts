import {Column, Entity, ManyToOne} from "typeorm";
import { Business } from "../Business/Business";
import User, { UserRoles } from "../User/User";


@Entity()
export class Merchant extends User {
	@ManyToOne(() => Business, bussiness => bussiness.merchant)
	bussiness: Business;

    @Column("text")
    role: UserRoles.Merchant
}
