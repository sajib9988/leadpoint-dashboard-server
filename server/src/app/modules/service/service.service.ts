import { fileUploader } from "../../helper/fileUploader";
import { prisma } from "../../middleware/prisma";
import { Request } from 'express';

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


export const serviceServices = {
  addService,

}
