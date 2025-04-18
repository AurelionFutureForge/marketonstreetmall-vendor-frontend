import * as z from "zod";

// Register User
export const addUserSchema = z.object({
  name: z.string().min(1, { message: "Should contain at least one character" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Should contain at least one character" }),
  password: z
    .string()
    .min(6, { message: "Password should contain minimum 6 characters" }),
  role: z.string().min(1, { message: "Please select an option" }),
});

export type AddUserFieldValues = z.infer<typeof addUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Should contain at least one character" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Should contain at least one character" }),
  role: z.string().min(1, { message: "Please select an option" }),
});

export type UpdateUserFieldValues = z.infer<typeof updateUserSchema>;

//Login User
export const loginUserSchema = z.object({
  email: z.string().email().min(1, "Should contain atleast 1 character"),
  password: z.string().min(6, "Password should contain atleast 6 characters"),
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
  name:z.string().min(1, "Should contain atleast one letter"),
  email:z.string().email().min(1, "Enter a valid email"),
  age:z.string().regex(/^\d+$/, "Input must be a number").min(1, 'Should contain alteast one character').max(3, "Age should contain at max 3 digits"),
  mobile_number: z.string().regex(/^\d+$/, "Input must be a number").min(1, "Should contain alteast one character").max(10, "Numbers should contain at most 10 digits"),
  role: z.string().optional(),
  parent_id: z.string().min(1, "Should contain atleast one character")
})

export type AddAppUserFieldValues = z.infer<typeof addAppUserSchema>

export const deleteAppUserSchema = z.object({
  newParentId: z.string().min(1, "Should contain atleast one character")
})

export type DeleteAppUserFieldValues = z.infer<typeof deleteAppUserSchema>

export const changeAdminPasswordSchema = z.object({
  old_password: z.string().min(6, "Password should contain atleast 6 characters"),
  new_password: z.string().min(6, "Password should contain atleast 6 characters"),
})

export type ChangeAdminPasswordValues = z.infer<typeof changeAdminPasswordSchema>
