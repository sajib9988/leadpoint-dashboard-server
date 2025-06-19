'use server'

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

// ✅ Add Service
export const addService = async (data: FormData) => {
 const accessToken = (await cookies()).get("accessToken")?.value;

 const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/add-service`, {
    method: 'POST',
    body: data,
      headers: {
      Authorization : accessToken as string
    },
  });

  console.log('resss', res);

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to add service');
  }

  return res.json();
}

// ✅ Get All Services
export const getAllServices = async () => {

   const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/all-services`, {
    method: 'GET',
    headers: {
      Authorization: accessToken as string,
    },

    next: {
      tags: ['services'],
    },

   
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to fetch services');
  }

  return res.json();
}

// ✅ Get Service by ID (No need to revalidate unless you cache it too)
export const getServiceById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/get-service/${id}`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to fetch service');
  }

  return res.json();
}

// ✅ Delete Service
export const deleteService = async (id: string) => {

  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/delete-service/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: accessToken as string,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to delete service');
  }

  return res.json();
}

// ✅ Update Service
export const updateService = async (id: string, data: FormData) => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/update-service/${id}`, {
    method: 'PUT',
    body: data,
    headers: {
      Authorization: accessToken as string,
    },
  });

  revalidateTag('services');

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to update service');
  }

  return res.json();
}
