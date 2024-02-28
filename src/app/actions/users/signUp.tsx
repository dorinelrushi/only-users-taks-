'use server'
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../utilis/prisma';
import { revalidatePath } from 'next/cache';

export const signUp = async (email: string, password: string, username: string) => {
    const user = await prisma.users.findUnique({
        where: {
            email,

        },
    });

    if (user) {
        return 'User with that email already exists.';
    }




    const passwordHash = bcrypt.hashSync(password, 10);

    await prisma.users.create({
        data: {
            email,
            password: passwordHash, // Store the hashed password
            username, // Include the username
        },
    });

    return "Successfully created new user!";
};


export async function create(formData: FormData) {
  const input = formData.get("title") as string;

  if (!input.trim()) {
    return;
  }

  await prisma.todo.create({
    data: {
      title: input,
    },
  });

  revalidatePath("/");
}
