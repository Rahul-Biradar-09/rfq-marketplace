const { z } = require("zod");

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),

  role: z.enum(["BUYER", "SUPPLIER"], {
    message: "Role must be either BUYER or SUPPLIER",
  }),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(1, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};