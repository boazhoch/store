import { Connection } from "typeorm";
import { Seeder, Factory } from "typeorm-seeding";
import { Business } from "../../entity/Business/Business";

export default class CreateBusiness implements Seeder {
	public async run(factory: Factory, connection: Connection): Promise<any> {
		await factory(Business)().createMany(10);
	}
}