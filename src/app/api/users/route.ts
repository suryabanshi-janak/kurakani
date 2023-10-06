import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { z } from 'zod';

import { db } from '@/lib/db';
import { SignUpValidator } from '@/lib/validators/signup';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { email, firstname, lastname, password } =
      SignUpValidator.parse(body);

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with the email address alreay exists!' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    await db.user.create({
      data: {
        email,
        firstname,
        lastname,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}
