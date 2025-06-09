import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../middleware/prisma";
import { Request } from 'express';
import { IServiceInput } from "./service.interface";

const addService = async (req: Request) => {
  console.log("🔍 Final Parsed Body:", req.body);

  const { icon, image } = req.files as { [fieldname: string]: Express.Multer.File[] };
  console.log("📁 Icon File:", icon?.[0]);
  console.log("🖼 Image File:", image?.[0]);

  const iconUrl = icon
    ? (await fileUploader.uploadToCloudinary(icon[0]))?.secure_url || ''
    : '';

  const imageUrl = image
    ? (await fileUploader.uploadToCloudinary(image[0]))?.secure_url || ''
    : '';

  console.log("✅ Cloudinary Uploads:", { iconUrl, imageUrl });

  const newService = await prisma.service.create({
    data: {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      slug: req.body.slug,
      icon: iconUrl,
      image: imageUrl,

    },
  });

  console.log("📦 DB Saved Service:", newService);

  return newService;
};


const getAllServices= async ()=>{
  const services = await prisma.service.findMany();
  console.log("📦 All Services:", services);
  return services;
}


const updateService = async (id: string, data: IServiceInput) => {
  const result = await prisma.service.update({
    where: { id },
    data: {
      title: data.title,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      slug: data.slug,
      icon: data.icon,
      image: data.image,
    },
  })
return result;


}

const deleteService = async (id: string) => {
  const result = await prisma.service.delete({
    where: { id },
  });
  return result;
}


const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: { id },
  });
  if (!service) {
    throw new Error(`Service with ID ${id} not found`);
  }
  return service;
}




export const serviceServices = {
  addService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,

}
