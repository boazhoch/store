import { IsNumber, IsString } from "class-validator";
import { Entity, Column } from "typeorm";
import Base from "../Base/Base";


export type IAddressEntity = {
    address: string;
    city: string;
    zip: string;
    state: string;
    country: string;
}

@Entity()
class AddressEntity extends Base implements IAddressEntity {
    @Column()
    @IsString()
    address: string;

    @Column()
    @IsString()
    city: string;

    @Column()
    @IsString()
    zip: string;

    @Column()
    @IsString()
    state: string;

    @Column()
    @IsString()
    country: string;
}

export default AddressEntity;