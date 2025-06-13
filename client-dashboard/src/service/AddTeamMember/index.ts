'use server';

// import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export const addTeamMember = async (data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-members/create`, {
    method: 'POST',
    body: data,
  });
console.log(await res.json());
  if (!res.ok) {
    const errText = await res.text();
    console.log('📛 Server Error:', errText);
    throw new Error('Failed to add team member');
  }

  revalidateTag('team-members');
  return res.json();
};

export const getAllMember = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-members/members`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log('📛 Server Error:', errText);
    throw new Error('Failed to get team members');
  }

  return res.json();
};

export const updateMember = async (id: string, data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-members/update/${id}`, {
    method: 'PUT',
    body: data,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log('📛 Server Error:', errText);
    throw new Error('Failed to update team member');
  }

  revalidateTag('team-members');
  return res.json();
};

export const deleteMember = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-members/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log('📛 Server Error:', errText);
    throw new Error('Failed to delete team member');
  }

  revalidateTag('team-members');
  return res.json();
};