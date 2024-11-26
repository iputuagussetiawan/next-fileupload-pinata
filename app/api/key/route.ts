import { pinata } from "@/lib/pinata";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    // If you're going to use auth you'll want to verify here
    try {
        const uuid = crypto.randomUUID();
        const keyData = await pinata.keys.create({
        keyName: uuid.toString(),
            permissions: {
                admin: true
            },
            maxUses: 5,
        })
        return NextResponse.json(keyData, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
    }
}