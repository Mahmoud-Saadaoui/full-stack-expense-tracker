import connectDB from "@/libs/connectDB";
import Transaction from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

interface Body {
    amount: number;
    name: string,
    startDate: Date
}
interface Params {
    id: string,
}

/**
 *  @method    : GET
 *  @route     : /api/transaction/:id
 * @access     : private (only user himself)
 * @description: get single transaction
*/
export async function Get(req: NextRequest, { params }: { params: Params }) {
    try {
        await connectDB()
        const transaction = await Transaction.findById(params.id)

        return NextResponse.json(transaction, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}

/**
 *  @method    : PUT
 *  @route     : /api/transaction/:id
 * @access     : private (only user himself)
 * @description: update single transaction
*/
export async function PUT(req: NextRequest, { params }: { params: Params }) {
    try {
        await connectDB()
        const body: Body = await req.json()
        const { amount, name, startDate } = body

        const updateTransaction = await Transaction.findByIdAndUpdate(
            params.id, {
                name,
                amount,
                startDate
            }
        )

        return NextResponse.json(updateTransaction, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}

/**
 *  @method    : PUT
 *  @route     : /api/transaction/:id
 * @access     : private (only user himself)
 * @description: delete single transaction
*/
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
    try {
        await connectDB()

        await Transaction.findByIdAndDelete(params.id)

        return NextResponse.json({ msg: "Deleted Transaction Successfully" }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json(
            { msg: error?.message },
            { status: 500 }
        );
    }
}