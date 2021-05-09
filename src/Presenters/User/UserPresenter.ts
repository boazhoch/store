import { NextFunction, Request, Response } from "express";
import { IUser } from "../../entity/User/type";
import StatusCodes from "http-status-codes";
import { sign } from "jsonwebtoken";
import Presenter from "..";
import { IPresenter } from "../types/type";

class UserPresneter extends Presenter implements IPresenter<IUser> {
	constructor(req: Request, res: Response, next: NextFunction) {
		super(req,res, next);
	}

	public one(user: IUser) {
		this.setAuthHeader(user);
		this.res.status(StatusCodes.OK).json({ data: user });
	}

	public create(user: IUser) {
		this.setAuthHeader(user);
		this.res.status(StatusCodes.CREATED).json({ data: user });
	}

	public delete(userId: string) {
		this.res.status(StatusCodes.OK).json({ data: userId, ok: true });
	}

	public all(users: IUser[]) {
		this.res.status(StatusCodes.OK).json({ data: users, ok: true });
	}

	private setAuthHeader<T extends { email: string, id: string }>(arg: T) {
		const newToken = sign({ email: arg.email, id: arg.id }, process.env.TOKEN_SECRET, {
			expiresIn: "24h"
		});
		this.res.setHeader("Authorization", `Bearer ${newToken}`);
	}
}

export default UserPresneter;