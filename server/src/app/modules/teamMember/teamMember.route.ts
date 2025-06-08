import express, { NextFunction, Request, Response } from 'express';

import {  teamMemberZodSchema } from './teamMember.validation';

import { fileUploader } from '../../helper/fileUploader';
import { teamMemberController } from './teamMember.cotroller';


const router = express.Router();

// router.get('/', getAllTeamMembers);
// router.get('/:id', getSingleTeamMember);
// router.delete('/:id', deleteTeamMember)


router.post('/service',  
    fileUploader.upload.single('avatar'),
 (req: Request, res: Response, next: NextFunction) => {
  req.body = teamMemberZodSchema.parse(JSON.parse(req.body.data));
  return teamMemberController.teamMemberCreate(req, res, next);
});

export const teamMemberRouter = router;
