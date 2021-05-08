import { IsBoolean } from "class-validator";
import { Entity, Column } from "typeorm";
import User, { UserRoles } from "../User/User";

@Entity()
class Admin extends User {
    @Column()
    @IsBoolean()
    isAdmin: true

    @Column()
    role: UserRoles.Admin
}

export default Admin;