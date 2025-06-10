import express, { NextFunction, Request, Response } from 'express';
import { teamMemberZodSchema, updateTeamMemberZodSchema } from './teamMember.validation';
import { fileUploader } from '../../helper/fileUploader';
import { teamMemberController } from './teamMember.cotroller';


const router = express.Router();

router.get('/members', teamMemberController.getAllMember);
router.get('/:id', teamMemberController.getSingleMember);
router.delete('/:id', teamMemberController.deleteMember);

router.post(
  '/create',
  fileUploader.upload.single('avatar'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = teamMemberZodSchema.parse(JSON.parse(req.body.data));
    return teamMemberController.teamMemberCreate(req, res, next);
  }
);

router.put(
  '/update/:id',
  fileUploader.upload.single('avatar'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = updateTeamMemberZodSchema.parse(JSON.parse(req.body.data));
    return teamMemberController.updateMember(req, res, next);
  }
);

export const teamMemberRouter = router;