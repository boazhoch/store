import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import User from "../../entity/User/User";


// create-pets.seed.ts
export default class CreateUsers implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(User)().createMany(10);
	}
}
