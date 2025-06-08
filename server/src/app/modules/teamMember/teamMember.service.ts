import { Request } from 'express';
import { prisma } from '../../middleware/prisma';
import { TeamMember } from '@prisma/client';


 const createTeamMemberService =  async (req: Request) => {
    const { name, role, bio, dataAiHint } = req.body;
    const avatar = req.file?.path || '';

    const newMember = await prisma.teamMember.create({
      data: {
        name,
        role,
        bio,
        avatar,
        dataAiHint,
        socials: {
          create: req.body.socials,
        },
      },

    });

    return newMember;
  }




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