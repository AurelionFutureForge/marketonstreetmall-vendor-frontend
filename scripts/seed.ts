import { db } from "@/lib/db";
import bcrypt from "bcrypt";

async function main() {
  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email: "admin@example.com",
      },
    });

    if (existingUser) {
      console.log("Sample user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash("password123", 10);

    const user = await db.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedPassword,
      },
    });

    console.log(`Created sample user: ${user.name} (${user.email})`);
  } catch (error) {
    console.error("Error creating sample user:", error);
  } finally {
    await db.$disconnect();
  }
}

main(); 