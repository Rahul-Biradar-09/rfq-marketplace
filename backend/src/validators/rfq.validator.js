const { z } = require("zod");

const createRfqSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, "Product/service name must be at least 2 characters")
    .max(200, "Product/service name must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  quantity: z
    .number({
      message: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  deliveryLocation: z
    .string()
    .trim()
    .min(1, "Delivery location is required"),

  deadline: z
    .string()
    .datetime("Deadline must be a valid date and time")
    .refine(
      (value) => new Date(value) > new Date(),
      "Deadline must be in the future"
    ),
});




const updateRfqSchema = z.object({
  productName: z
    .string()
    .trim()
    .min(2, "Product/service name must be at least 2 characters")
    .max(200, "Product/service name must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  quantity: z
    .number({
      message: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be greater than 0"),

  deliveryLocation: z
    .string()
    .trim()
    .min(1, "Delivery location is required"),

  deadline: z
    .string()
    .datetime("Deadline must be a valid date and time")
    .refine(
      (value) => new Date(value) > new Date(),
      "Deadline must be in the future"
    ),
});

module.exports = {
  createRfqSchema,
  updateRfqSchema,
};