import { define, factory } from "typeorm-seeding";
import User, { UserRoles } from "../../entity/User/User";
import AddressEntity, { IAddressEntity } from "../../entity/Address/Address";
import { Business } from "../../entity/Business/Business";


// user.factory.ts
define(User, (faker: Faker.FakerStatic) => {
	const gender = faker.random.number(1);

	const user = new User();

	const pass = faker.random.word();
	user.address = factory(AddressEntity)() as any;
	user.confirmPassword = pass;
	user.password = pass;
	user.createdAt = faker.date.recent();
	user.updatedAt = faker.date.recent();
	user.lastName = faker.name.firstName(gender);
	user.firstName = faker.name.lastName(gender);
	user.email = faker.internet.email();
	user.role = UserRoles.User;
	user.isAdmin = faker.random.boolean();
	user.isMerchant = faker.random.boolean();

	console.log(user);

	return user;
});

define(Business, (faker: Faker.FakerStatic) => {
	const b = new Business();
	b.desciprtion = faker.random.words();
	b.email = faker.internet.email();
	b.title = faker.random.words();
	b.phone = faker.phone.phoneNumber();
	b.slug = faker.internet.domainName();
	// b.merchant = factory(User)() as any;

	console.log(b);

	return b;
});

define(AddressEntity, (faker: Faker.FakerStatic): IAddressEntity => {
	const address = new AddressEntity();
	
	address.address = faker.address.streetAddress();
	address.city = faker.address.city();
	address.country = faker.address.country();
	address.state = faker.address.state();
	address.zip = faker.address.zipCode();

	console.log(address);

	return address;
});