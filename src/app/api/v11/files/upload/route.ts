import { getFakeBusinessData } from '@/entities/organization/lib/get-fake-business-data';
import { IFile } from '@/shared/ui/file-list';
import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';
import { v4 } from 'uuid';

export async function POST(request: Request) {
    try {
        // Получаем данные из запроса
        const formData = await request.formData();

        // Пример обработки данных из FormData
        const file = formData.get('file');

        // Логика для создания организации (например, запись в базу данных)
        // const organization = await createOrganizationInDB({ name, description });
        const fakeFile: IFile = {
            id: v4(),
            name: 'test',
            type: 'image/png',
            url: faker.image.urlLoremFlickr({ category: 'business' }),
        }
        return NextResponse.json(fakeFile);
        // Возвращаем ответ клиенту
        return NextResponse.json({});
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error creating organization' }, { status: 500 });
    }
}