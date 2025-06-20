'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const addTeamMember = async (data: FormData) => {
  
     const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${BASE_URL}/team-members/create`, {
    method: 'POST',
    body: data,
      headers: {
      'Authorization': accessToken as string,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    throw new Error(result?.message || "Something went wrong while adding team member");
  }

  revalidateTag('team-members');
  return result;
};

export const updateMember = async (id: string, data: FormData) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${BASE_URL}/team-members/update/${id}`, {
    method: 'PUT',
    body: data,
    headers: {
      'Authorization': accessToken as string,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    throw new Error(result?.message || "Something went wrong while updating team member");
  }

  revalidateTag('team-members');
  return result;
};

export const deleteMember = async (id: string) => {

  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${BASE_URL}/team-members/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': accessToken as string,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    throw new Error(result?.message || "Something went wrong while deleting team member");
  }

  revalidateTag('team-members');
  return result;
};

export const getAllMember = async () => {

  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${BASE_URL}/team-members/members`, {
    method: 'GET',
    headers: {
      'Authorization': accessToken as string,
    },
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("API Error:", result);
    throw new Error(result?.message || "Failed to load team members");
  }

  return result;
};
