import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { teamMemberService } from './teamMember.service';

const teamMemberCreate = catchAsync(async (req: Request, res: Response) => {
  const result = await teamMemberService.createTeamMemberService(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member created successfully',
    data: result,
  });
});

const getAllMember = catchAsync(async (req: Request, res: Response) => {
  const result = await teamMemberService.getAllTeamMembersService();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team members retrieved successfully',
    data: result,
  });
});

const getSingleMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamMemberService.getSingleTeamMemberService(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Team member not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member retrieved successfully',
    data: result,
  });
});

const updateMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamMemberService.updateTeamMemberService(id, req);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Team member not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member updated successfully',
    data: result,
  });
});

const deleteMember = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await teamMemberService.deleteTeamMemberService(id);
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Team member not found',
      data: null,
    });
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member deleted successfully',
    data: result,
  });
});

export const teamMemberController = {
  teamMemberCreate,
  getAllMember,
  getSingleMember,
  updateMember,
  deleteMember,
};