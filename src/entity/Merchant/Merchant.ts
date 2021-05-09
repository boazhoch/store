import {Column, Entity, ManyToOne} from "typeorm";
import { Business } from "../Business/Business";
import User, { UserRoles } from "../User/User";


@Entity()
export class Merchant extends User {
	@ManyToOne(() => Business, business => business.merchant)
	business: Business;

    @Column("text")
    role: UserRoles.Merchant
}
