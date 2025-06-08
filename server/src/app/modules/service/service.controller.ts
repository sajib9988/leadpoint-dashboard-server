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

// const getAllBike= catchAsync(async (req: Request, res: Response) => {
//     const result = await BikeService.getAllBike();  
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "All bike get successfully",
//         data: result,
//       });


// })


// const getSingleBike= catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;          
//     const result = await BikeService.getSingleBike(id);
//     sendResponse(res, {     
//         statusCode: httpStatus.OK,
//         success: true,
//         message: "Single bike get successfully",
//         data: result,
//       });
// });

// export const bikeController = {
//     bikeCreate,
//     getAllBike,
//     getSingleBike
// }



export const serviceController = {
    serviceCreate,
    // getAllBike,
    // getSingleBike
};