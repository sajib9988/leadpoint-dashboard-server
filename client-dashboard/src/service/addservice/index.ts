'use server'




export const addService = async (data: FormData) => {
  console.log("📡 Sending POST to backend...");
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/add-service`, {
    method: 'POST',

    body: data,
  });
console.log('resss', res);
  if (!res.ok) {
  const errText = await res.text();
  console.log("📛 Server Error:", errText);
  throw new Error('Failed to add service');
}


  return res.json();
}


export const getAllServices = async () => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/all-services`, {
    method: 'GET',
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to fetch services');
  }

  return res.json();
}



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











export const deleteService = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/delete-service/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to delete service');
  }

  return res.json();
}




export const updateService = async (id: string, data: FormData) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/service/update-service/${id}`, {
    method: 'PUT',
    body: data,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.log("📛 Server Error:", errText);
    throw new Error('Failed to update service');
  }

  return res.json();
}