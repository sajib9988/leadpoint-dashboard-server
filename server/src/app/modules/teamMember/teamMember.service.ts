import { Request } from 'express';
import { prisma } from '../../middleware/prisma';
import { TeamMember } from '@prisma/client';


import { fileUploader } from '../../helper/fileUploader'; // নিশ্চিত করুন import হয়েছে

const createTeamMemberService = async (req: Request) => {
  const { name, role, bio } = req.body;

  let avatar = '';
  if (req.file) {
    const uploaded = await fileUploader.uploadToCloudinary(req.file);
    avatar = uploaded?.secure_url || '';
  }

  const newMember = await prisma.teamMember.create({
    data: {
      name,
      role,
      bio,
      avatar, 
 
      socials: {
        create: req.body.socials,
      },
    },
  });

  return newMember;
};





const getAllTeamMembersService = async (): Promise<TeamMember[]> => {
  const result = await prisma.teamMember.findMany();
  return result;
};

 const getSingleTeamMemberService = async (
  id: string
): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.findUnique({
    where: { id },
  });

  return result;
};
 const deleteTeamMemberService = async (
  id: string
): Promise<TeamMember> => {
  const result = await prisma.teamMember.delete({
    where: { id },
  });

  return result;
};


export const teamMemberService ={
    createTeamMemberService,
    getAllTeamMembersService,
    getSingleTeamMemberService,
    deleteTeamMemberService,
}