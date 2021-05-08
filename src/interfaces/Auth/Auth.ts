interface IAuth {
    hashPassword(password:string): Promise<string>
    comparePassword(unencryptedPassword: string, matchingPassword: string): Promise<boolean>
}

class Auth implements IAuth {
	constructor(
        private hash: (data: any, saltOrRounds: string | number, callback?: (err: Error, encrypted: string) => void) => Promise<string>,
		private compare: (data: any, encrypted: string, callback?: (err: Error, same: boolean) => void) => Promise<boolean>
	){

	}

	public async hashPassword(password: string) {
		return await this.hash(password, 8);
	} 
    
	public async comparePassword(unencryptedPassword: string, userPassowrd: string) {
		try {
			const isPasswordMatching = await this.compare(unencryptedPassword, userPassowrd);
			if(!isPasswordMatching) {
				throw new Error();
			}
			return isPasswordMatching;
		} catch (e) {
			throw new Error("Passwords don't match");
		}
	}
}

export {IAuth};
export default Auth;