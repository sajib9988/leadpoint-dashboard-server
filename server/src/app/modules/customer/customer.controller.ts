import { Request, Response } from "express";
import { CustomerService } from "./customer.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';
import catchAsync from "../../utils/catchAsync";



export const createCustomer = async (req: Request, res: Response) => {
  const result = await CustomerService.createCustomer(req.body);
 
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer created successfully",
    data: result,
  })

};

const getAllCustomer = async (req: Request, res: Response) => {
  const result = await CustomerService.getAllCustomer();  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer fetched successfully",
    data: result,
  });
};


const getSpecificCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const result = await CustomerService.getSpecificCustomer(customerId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single customer fetched successfully",
    data: result,
  });
});


const updateCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params; 
  const result = await CustomerService.updateCustomer(customerId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer updated successfully",
    data: result,
  });
});

const deleteCustomer = catchAsync(async (req: Request, res: Response) => {
  const { customerId } = req.params; 
  const result = await CustomerService.deleteCustomer(customerId);  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Customer deleted successfully",
    data: result,
  });
});



export const customerController = {
  createCustomer,  
  getAllCustomer,
  getSpecificCustomer,
  updateCustomer,
  deleteCustomer,

}