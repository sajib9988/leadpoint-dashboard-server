'use server'

import { cookies } from "next/headers";
import { revalidateTag } from 'next/cache';


export const addTeamMember= async(data:FormData)=>{


// const accessToken = (await cookies()).get("accessToken")?.value;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-members/service`, {
        method: 'POST',
        // headers: {
        // Authorization: accessToken as string
        // },
        body: data,
    });
    
    if (!res.ok) {
        throw new Error('Failed to add team member');
    }
    
    return res.json();

}

export const getAllMember =async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-member/members`, {
        method: 'Get',
        // headers: {
        // Authorization: accessToken as string
        // },
     
    });
    
    if (!res.ok) {
        throw new Error('Failed to add team member');
    }
    
    return res.json();
}


export const updateMember = async (id: string, data: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-member/update-member/${id}`, {
    method: 'PUT',
    body: data,
  });

  revalidateTag('services');

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to update service');
  }

  return res.json();
}

export const deleteMember = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/team-member/delete-member/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const errText = await res.text();
    console.log('📛 Server Error:', errText);
    throw new Error('Failed to delete member');
  }
  return res.json();
};


