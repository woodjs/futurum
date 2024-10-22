import { getFakeBusinessData, getFakeOrganizationData } from '@/entities/organization/lib/get-fake-business-data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        return NextResponse.json({ success: true, message: 'Organization created' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error creating organization' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const organizations = new Array(10).fill(0).map((_, index) => (getFakeOrganizationData(index)));
        return NextResponse.json({ organizationList: organizations });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error getting organizations' }, { status: 500 });
    }
}