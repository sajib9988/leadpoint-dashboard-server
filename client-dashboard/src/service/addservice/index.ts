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