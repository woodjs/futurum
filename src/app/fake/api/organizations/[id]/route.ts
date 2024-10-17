import { OrganizationType } from "@/entities/organization";
import { getFakeOrganizationData } from "@/entities/organization/lib/get-fake-business-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const organization = getFakeOrganizationData(2, OrganizationType.STARTUP);
        return NextResponse.json(organization);
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error getting organizations' }, { status: 500 });
    }
}


export async function PATCH(request: Request) {
    try {
        const organization = getFakeOrganizationData(2, OrganizationType.STARTUP);

        return NextResponse.json(organization);
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error getting organizations' }, { status: 500 });
    }
}