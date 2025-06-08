import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../middleware/prisma";
import { Request } from 'express';

const addService= async (req: Request)=>{
  const { title, shortDescription, longDescription, slug, dataAiHint } = req.body;



const iconUrl = req.files?.icon
  ? (await fileUploader.uploadToCloudinary((req.files as any).icon[0]))?.secure_url || ''
  : '';


  const imageUrl = req.files?.image
  ? (await fileUploader.uploadToCloudinary((req.files as any).image[0]))?.secure_url || ''
  : '';

const newService = await prisma.service.create({
    data: {
      title,
      shortDescription,
      longDescription,
      slug,
      icon: iconUrl,
      image: imageUrl,
      dataAiHint,
    },
  });

  return newService;



}

export const serviceServices = {
  addService,

}
