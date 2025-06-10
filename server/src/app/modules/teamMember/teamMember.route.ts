import express, { NextFunction, Request, Response } from 'express';

import {  teamMemberZodSchema } from './teamMember.validation';

import { fileUploader } from '../../helper/fileUploader';
import { teamMemberController } from './teamMember.cotroller';
import { updateServiceZodSchema } from '../service/service.validation';



const router = express.Router();

router.get('/members', teamMemberController.getAllMember);
// router.get('/:id', getSingleTeamMember);
// router.delete('/:id', deleteTeamMember)


router.post('/service',  
    fileUploader.upload.single('avatar'),
 (req: Request, res: Response, next: NextFunction) => {
  req.body = teamMemberZodSchema.parse(JSON.parse(req.body.data));
  return teamMemberController.teamMemberCreate(req, res, next);
});


router.put('/update-member/:id',
  fileUploader.upload.single('avatar'),
  (req:Request, res:Response, next:NextFunction)=>{
    req.body= updateServiceZodSchema.parse(JSON.parse(req.body.data));
    return teamMemberController.updateMember(req, res, next); 
  }
)
export const teamMemberRouter = router;
