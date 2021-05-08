import { IAddressEntity } from "./../Address/Address";
import { UserRoles } from "./User";

interface IUser {
    firstName: string;
    lastName: string;
    eamil: string;
    password: string;
    address: IAddressEntity;
    role: UserRoles;
    isAdmin: boolean;
}

export {IUser};
