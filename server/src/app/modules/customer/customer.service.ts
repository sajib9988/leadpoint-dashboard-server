import { prisma } from "../../middleware/prisma";
import { IUpdateCustomer } from "./customer.interface";

// Create Customer
const createCustomer = async (data: {
  name: string;
  email: string;
  phone: string;
}) => {

  // Check if customer already exists
  const existingCustomer = await prisma.customer.findUnique({ 
    where: { email: data.email },
  });

  
  if (existingCustomer) { 
    throw new Error("Customer already exists with this email!!");
  } 


  const result = await prisma.customer.create({ data });
  return result;
};

// Get All Customers
const getAllCustomer = async () => {
  const result = await prisma.customer.findMany();
  return result;
};

// Get Specific Customer by ID
const getSpecificCustomer = async (customerId: string) => {
  const result = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!result) {
    throw new Error("Customer not found!!"); 
  }

  return result;
};

// Update Customer by ID
const updateCustomer = async (customerId: string, payload: IUpdateCustomer) => {
  const isExistCustomer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!isExistCustomer) {
    throw new Error("Customer not found for update!!");
  }

  const result = await prisma.customer.update({
    where: { id: customerId },
    data: payload,
  });

  return result;
};

// Delete Customer by ID
const deleteCustomer = async (customerId: string) => {
  const isExistCustomer = await prisma.customer.findUnique({
    where: { id: customerId },
  });

  if (!isExistCustomer) {
    throw new Error("Customer not found for delete!!");
  }

  await prisma.customer.delete({
    where: { id: customerId },
  });

  return { message: "Customer deleted successfully" };
};

export const CustomerService = {
  createCustomer,
  getAllCustomer,
  getSpecificCustomer,
  updateCustomer,
  deleteCustomer,
}
