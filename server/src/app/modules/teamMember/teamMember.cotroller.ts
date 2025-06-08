import { Request, Response } from 'express';
import httpStatus from 'http-status';


import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { teamMemberService } from './teamMember.service';

const teamMemberCreate = catchAsync(async (req: Request, res: Response) => {
  const result = await teamMemberService.createTeamMemberService(req)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Team member created successfully',
    data: result,
  });
});

export default teamMemberCreate;

export const teamMemberController = {
  teamMemberCreate,
};
