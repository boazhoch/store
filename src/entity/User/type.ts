import { Business } from "../Business/Business";
import { IAddressEntity } from "./../Address/Address";
import { UserRoles } from "./User";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: IAddressEntity;
    role: UserRoles;
    isAdmin: boolean;
    isMerchant: boolean;
    business: Business;
    id: string;
}

export {IUser};
