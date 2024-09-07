import connectDB from "@/libs/connectDB";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    amount: number;
    name: string,
    startDate: Date
}

/**
 *  @method    : GET
 *  @route     : /api/transaction
 * @access     : private (only user himself)
 * @description: get all transactions
*/
export async function GET(request: NextRequest) {
    try {
        await connectDB()
        const userId = request.cookies.get("userId")?.value;
        const transactions = await Transaction.find({ userId })
        return NextResponse.json(transactions)
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}

/**
 *  @method    : POST
 *  @route     : /api/transaction
 * @access     : private (only user himself)
 * @description: create new transaction
*/
export async function POST(request:NextRequest) {
    try {
        await connectDB()

        const body: Body = await request.json()
        const { amount, name, startDate } = body

        const userId = request.cookies.get("userId")?.value;
        console.log(' userId:', userId);
        const newTransaction = await Transaction.create({
            name,
            amount,
            startDate,
            userId
        })
        return NextResponse.json(newTransaction, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}

/**
 *  @method    : DELETE
 *  @route     : /api/transaction
 * @access     : private (only user himself)
 * @description: delete all transactions
*/
export async function DELETE(request:NextRequest) {
    try {
        await connectDB()
        const userId = request.cookies.get("userId")?.value;
        await Transaction.deleteMany({ userId })
        return NextResponse.json({ msg: "All Transactions Deleted Successfully" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}