'use server'

import { cookies } from "next/headers";


export const addService = async (data: FormData) => {

const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch('${process.env.NEXT_PUBLIC_BASE_API}/service', {
    method: 'POST',
       headers: {
      Authorization : accessToken as string
    },
    body: data,
  });

  if (!res.ok) {
    throw new Error('Failed to add service');
  }

  return res.json();
}