import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../middleware/prisma";
import { Request } from 'express';

const addService= async (req: Request)=>{
  const { title, shortDescription, longDescription, slug,  } = req.body;


const { icon, image } = req.files as { [fieldname: string]: Express.Multer.File[] };

const iconUrl = icon
  ? 
  (await fileUploader.uploadToCloudinary(icon[0]))?.secure_url || ''
  : 
  '';

const imageUrl = image
  ? 
  (await fileUploader.uploadToCloudinary(image[0]))?.secure_url || ''
  :
 '';


const newService = await prisma.service.create({
    data: {
      title,
      shortDescription,
      longDescription,
      slug,
      icon: iconUrl,
      image: imageUrl,
     
    },
  });

  return newService;



}

export const serviceServices = {
  addService,

}
