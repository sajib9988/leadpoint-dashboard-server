import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import httpStatus from 'http-status';
import { serviceServices } from "./service.service";

const  serviceCreate = catchAsync(async (req: Request, res: Response) => {

const result = await serviceServices.addService(req);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "service create successfully",
        data: result,
      });
});

const getAllServices= catchAsync(async (req: Request, res: Response) => {
    const result = await serviceServices.getAllServices();  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All service get successfully",
        data: result,
      });


})






export const serviceController = {
    serviceCreate,
    getAllServices
};