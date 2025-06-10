import { Request } from 'express';
import { prisma } from '../../middleware/prisma';
import { TeamMember } from '@prisma/client';
import { fileUploader } from '../../helper/fileUploader';

const createTeamMemberService = async (req: Request) => {
  const { name, role, bio, socials } = req.body;
  let avatar = '';
  if (req.file) {
    const uploaded = await fileUploader.uploadToCloudinary(req.file);
    if (!uploaded?.secure_url) {
      throw new Error('Failed to upload avatar');
    }
    avatar = uploaded.secure_url;
  }

  // Ensure socials is an array, default to empty array if not provided
  const socialsData = Array.isArray(socials) ? socials : [];

  const newMember = await prisma.teamMember.create({
    data: {
      name,
      role,
      bio,
      avatar,
      socials: socialsData, // Store as JSON
    },
  });

  return newMember;
};

const getAllTeamMembersService = async (): Promise<TeamMember[]> => {
  const result = await prisma.teamMember.findMany();
  return result;
};

const getSingleTeamMemberService = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.findUnique({
    where: { id },
  });
  return result;
};

const deleteTeamMemberService = async (id: string): Promise<TeamMember | null> => {
  const result = await prisma.teamMember.delete({
    where: { id },
  });
  return result;
};

const updateTeamMemberService = async (id: string, req: Request) => {
  const { name, role, bio, socials } = req.body;
  let avatar = '';
  if (req.file) {
    const uploaded = await fileUploader.uploadToCloudinary(req.file);
    if (!uploaded?.secure_url) {
      throw new Error('Failed to upload avatar');
    }
    avatar = uploaded.secure_url;
  }

  // Ensure socials is an array, default to empty array if not provided
  const socialsData = Array.isArray(socials) ? socials : [];

  const updatedMember = await prisma.teamMember.update({
    where: { id },
    data: {
      name,
      role,
      bio,
      ...(avatar && { avatar }), // Only update avatar if provided
      socials: socialsData, // Store as JSON
    },
  });

  return updatedMember;
};

export const teamMemberService = {
  createTeamMemberService,
  getAllTeamMembersService,
  getSingleTeamMemberService,
  deleteTeamMemberService,
  updateTeamMemberService,
};