import { Request, Response, NextFunction } from "express";

interface IBaseRestController {
    all(request: Request, response: Response, next: NextFunction): Promise<void>
	one(request: Request, response: Response, next: NextFunction): Promise<void>
	save(request: Request, response: Response, next: NextFunction): Promise<void>
	remove(request: Request, response: Response, next: NextFunction): Promise<void>
}

class BaseResetController {
    
}

export default BaseResetController;

export { IBaseRestController };