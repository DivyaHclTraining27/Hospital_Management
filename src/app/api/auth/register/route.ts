import { NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongodb";
import User from "@/models/user";

/**
 * Description for the below snippet
 *
 * @export
 * @param {Request} req
 */
export async function POST(req: Request) {
  try {
    await connectToDB();
    const reqBody = await req.json();

    const existingUser = await User.findOne({ email: reqBody?.email });
    if (existingUser)
      return NextResponse.json(
        { error: "User already exists", msgCode: "E10000" },
        { status: 409 }
      );

    const newUser = await User.create(reqBody);
    return NextResponse.json(
      {
        message: "User registered successfully",
        data: newUser,
        msgCode: "100003",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal Server Error", msgCode: "E10004" },
      { status: 500 }
    );
  }
}
