import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    try {
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error creating organization' }, { status: 500 });
    }
}