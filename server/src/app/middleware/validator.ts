import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod";

const Validator = (schema: ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody = await schema.parseAsync(req.body || {});
            req.body = validatedBody;
            next();
        } catch (err) {
            next(err)
        }
    }
}

export default Validator