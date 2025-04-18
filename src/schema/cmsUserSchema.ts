import * as z from "zod";

// Register User
export const addUserSchema = z.object({
  name: z.string().min(1, { message: "Should contain at least one character" }),
  email: z
    .string()
    .email({ message: "Kindly enter a valid email" })
    .min(1, { message: "Kindly enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password should contain minimum 8 characters" }),
  role: z.string().min(1, { message: "Please select an option" }),
});

export type AddUserFieldValues = z.infer<typeof addUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Kindly enter a valid name" }),
  email: z
    .string()
    .email({ message: "Kindly enter a valid email" })
    .min(1, { message: "Kindly enter a valid email" }),
  role: z.string().min(1, { message: "Please select an option" }),
});

export type UpdateUserFieldValues = z.infer<typeof updateUserSchema>;

//Login User
export const loginUserSchema = z.object({
  email: z.string().email().min(1, "Kindly enter a valid email"),
  password: z.string().min(8, "Password should contain atleast 8 characters"),
});

export type LoginUserFieldValues = z.infer<typeof loginUserSchema>

//Verify user
export const verifyUserSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export type VerifyUserFieldValues = z.infer<typeof verifyUserSchema>

//AddAppUser

export const addAppUserSchema = z.object({
  name:z.string().min(1, "Kindly enter a valid name"),
  email:z.string().email().min(1, "Kindly enter a valid email"),
  age:z.string().regex(/^\d+$/, "Age must be a number").min(1, 'Age should contain alteast one character').max(3, "Age should contain at max 3 digits"),
  mobile_number: z.string().regex(/^\d+$/, "Mobile number must be a number").min(1, "Mobile number should contain alteast one character").max(10, "Mobile number should contain at most 10 digits"),
  role: z.string().optional(),
  parent_id: z.string().min(1, "Id should contain atleast one character")
})

export type AddAppUserFieldValues = z.infer<typeof addAppUserSchema>

export const deleteAppUserSchema = z.object({
  newParentId: z.string().min(1, "Id should contain atleast one character")
})

export type DeleteAppUserFieldValues = z.infer<typeof deleteAppUserSchema>

export const changeAdminPasswordSchema = z.object({
  old_password: z.string().min(8, "Password should contain atleast 8 characters"),
  new_password: z.string().min(8, "Password should contain atleast 8 characters"),
})

export type ChangeAdminPasswordValues = z.infer<typeof changeAdminPasswordSchema>
