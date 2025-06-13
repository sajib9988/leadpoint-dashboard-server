import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import httpStatus from 'http-status';
import { Request, Response } from 'express';




const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member created successfully',
    data: result,
  });
});

const logInUser =catchAsync(async (req: Request, res: Response) => {
  const result = await authService.logInUser(req.body, req);
  
  const { refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
  });


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user logged in successfully",
    data: result
  });
});


const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);
  res.cookie('refreshToken', refreshToken, {
      secure: false,
      httpOnly: true
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "access token generate successfully",
    data: result
  });
});

export const authController = {
  registerUser, 
  logInUser,
  refreshToken

}