import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/libs/connectDB";
import createToken from "@/libs/createTokens";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    email: string;
    password: string;
    confirmPassword?: string;
    username: string;
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
    const { username, email, password, confirmPassword } = body

    //  Confirm Password
    if (password !== confirmPassword) {
        return NextResponse.json({ msg: "Passwords doesn't match" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    //  Create New User
    const user = await User.create({ username, email, password: hashedPassword })

    // Generate Token
    const token = await createToken(user._id.toString())

    return NextResponse.json({ user, token }, { status: 200 })
}