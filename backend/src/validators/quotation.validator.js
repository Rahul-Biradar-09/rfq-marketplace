const { z } = require("zod");

const createQuotationSchema = z.object({
  quotedPrice: z
    .number({
      message: "Quoted price must be a number",
    })
    .positive("Quoted price must be greater than 0"),

  estimatedDeliveryTime: z
    .string()
    .trim()
    .min(1, "Estimated delivery time is required")
    .max(100, "Estimated delivery time must not exceed 100 characters"),

  message: z
    .string()
    .trim()
    .max(1000, "Message must not exceed 1000 characters")
    .optional(),
});

module.exports = {
  createQuotationSchema,
};