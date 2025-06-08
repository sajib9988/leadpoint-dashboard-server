import { prisma } from "../../middleware/prisma";
import { ICreateBike } from "./service.interface";


const createBike = async (payload: ICreateBike) => {
    // চেক করা হচ্ছে যে customerId দিয়ে একটি গ্রাহক আছে কিনা
    const customerExist = await prisma.customer.findUnique({
      where: {
        id: payload.customerId,  // customerId চেক করা হচ্ছে
      },
    });
  

    if (!customerExist) {
      throw new Error("Customer not found!");
    }
  

    const existingBike = await prisma.bike.findFirst({
      where: {
        customerId: payload.customerId,
        brand: payload.brand,
        model: payload.model,
      },
    });
 
    if (existingBike) {
      throw new Error("Bike with this brand and model already exists for this customer!");
    }
  
 
    const result = await prisma.bike.create({
      data: payload,
    });
  
    return result;
  };








const getAllBike = async () => {
    const result = await prisma.bike.findMany()
    return result
}




const getSpecificBike = async (bikeId: string) => {
    const result = await prisma.bike.findUniqueOrThrow({
        where: {
             bikeId
        }
    })
    if (!result) {
        throw new Error("Bike not found !!")
    }
    return result
}

const getSingleBike = async (bikeId: string) => {
    const result = await prisma.bike.findUniqueOrThrow({
        where: {
            bikeId
        }
    })
    return result;
}



export const BikeService = {
    createBike,

    getAllBike,
    getSingleBike,

}