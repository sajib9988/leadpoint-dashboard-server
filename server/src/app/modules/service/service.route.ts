import { Request, Response, NextFunction, Router } from "express";
import {  serviceController } from "./service.controller";

import { serviceZodSchema, updateServiceZodSchema } from "./service.validation";
import { fileUploader } from "../../helper/fileUploader";


const router = Router();


router.get('/all-services', serviceController.getAllServices);

router.get('/get-service/:id', serviceController.getServiceById);

router.delete('/delete-service/:id', serviceController.deleteService);

router.put(
  '/update-service/:id',
  fileUploader.upload.fields([
    { name: 'icon', maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log("📥 Incoming Request:", req.body);
    console.log("🖼 Uploaded Files:", req.files);
    req.body = updateServiceZodSchema.parse(JSON.parse(req.body.data));
    return serviceController.updateService(req, res, next);
  }
);


router.post(
  '/add-service',

  
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
