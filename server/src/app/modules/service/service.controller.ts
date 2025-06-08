import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BikeService } from "./service.service";
import httpStatus from 'http-status';

const  bikeCreate= catchAsync(async (req: Request, res: Response) => {

    const result = await BikeService.createBike(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "bike create successfully",
        data: result,
      });
});

const getAllBike= catchAsync(async (req: Request, res: Response) => {
    const result = await BikeService.getAllBike();  
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All bike get successfully",
        data: result,
      });


})


const getSingleBike= catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;          
    const result = await BikeService.getSingleBike(id);
    sendResponse(res, {     
        statusCode: httpStatus.OK,
        success: true,
        message: "Single bike get successfully",
        data: result,
      });
});

export const bikeController = {
    bikeCreate,
    getAllBike,
    getSingleBike
}