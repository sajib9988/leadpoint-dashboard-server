import { Request, Response, NextFunction, Router } from "express";
import {  serviceController } from "./service.controller";

import { serviceZodSchema } from "./service.validation";
import { fileUploader } from "../../helper/fileUploader";


const router = Router();






router.post(
  '/service',
  fileUploader.upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = serviceZodSchema.parse(JSON.parse(req.body.data));
    return serviceController.serviceCreate(req, res, next);
  }
);



export const serviceRoute = router;
