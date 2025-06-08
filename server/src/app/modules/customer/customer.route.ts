import { Router } from "express";
import { customerController } from "./customer.controller";
import Validator from "../../middleware/validator";
import { customerSchema } from "./customer.validation";
const router = Router();

router.post("/", Validator(customerSchema.createCustomer),customerController.createCustomer);
router.get("/", customerController.getAllCustomer)
router.get("/:customerId", customerController.getSpecificCustomer)
router.put("/:customerId", Validator(customerSchema.updateCustomer), customerController.updateCustomer)
router.delete("/:customerId", customerController.deleteCustomer)


export const customerRoutes = router;