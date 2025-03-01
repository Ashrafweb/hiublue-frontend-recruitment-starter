import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address." }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long. " })
    .max(100, { message: "Password cannot exceed 100 characters." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const CreateOfferFormSchema = z.object({
  plan_type: z.enum(["monthly", "yearly", "pay_as_you_go"]),
  additions: z
    .array(z.enum(["refundable", "on_demand", "negotiable"]))
    .min(1, { message: "Please select at least one" }),
  user_id: z.number({ message: "Please select a user" }).int().positive(),
  expired: z.string({ message: "Expired Date is required" }).refine(
    (dateString) => {
      try {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      } catch (error) {
        return false;
      }
    },
    {
      message: "Invalid date format. Use YYYY-MM-DD.",
    }
  ),
  price: z.number().positive(),
});

export type CreateOfferFormData = z.infer<typeof CreateOfferFormSchema>;
