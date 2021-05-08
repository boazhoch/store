import { Request, Response } from "express";
import { IUser } from "../../entity/User/type";
import StatusCodes from "http-status-codes";
import { sign } from "jsonwebtoken";
import Presenter from "..";
import { IPresenter } from "../types/type";

class UserPresneter extends Presenter implements IPresenter<IUser> {
	constructor(req: Request, res: Response) {
		super(req,res);
	}

	public one(user: IUser) {
		const newToken = sign({ emai: user.eamil }, process.env.TOKEN_SECRET, {
			expiresIn: "24h"
		});
		this.res.setHeader("token", newToken);
		this.res.status(StatusCodes.OK).json({ data: user });
	}

	public create(user: IUser) {
		const newToken = sign({ emai: user.eamil }, process.env.TOKEN_SECRET, {
			expiresIn: "24h"
		});
		this.res.setHeader("token", newToken);
		this.res.status(StatusCodes.CREATED).json({ data: user });
	}

	public delete(userId: string) {
		this.res.status(StatusCodes.OK).json({ data: userId, ok: true });
	}

	public all(users: IUser[]) {
		this.res.status(StatusCodes.OK).json({ data: users, ok: true });
	}
}

export default UserPresneter;