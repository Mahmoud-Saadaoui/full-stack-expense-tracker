import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/libs/connectDB";
import createToken from "@/libs/createTokens";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    email: string;
    password: string;
}

/**
 *  @method: POST
 *  @route : /api/auth/register
 * @access : public
*/
export async function POST(request: NextRequest) {
    //  Connecting With MongoDB
    await connectDB()

    const body: Body = await request.json()
    const { email, password } = body

    // Find User
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({ msg: "Invalid Credentials" }, { status: 400 })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return NextResponse.json({ msg: "Invalid Credentials" }, { status: 400 })
    }

    // Generate Token
    const token = createToken(user._id.toString())

    return NextResponse.json(
      { data: { username: user.username, email: user.email }, token },
      { status: 200 }
    );
}