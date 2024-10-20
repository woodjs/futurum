import { faker } from "@faker-js/faker";
import { IBusinessOrganization, ICharityOrganization, IEmployeeInfo, IOrganization, IOrganizationDocuments, IStartupOrganization, OrganizationType } from "../model";
export const getFakeBusinessData = (seed = 0): IBusinessOrganization => {

    faker.seed(seed);
    return {
        verified: faker.helpers.arrayElement([true, false]),
        rating: faker.number.int({ min: 0, max: 5 }),
        type: OrganizationType.BUSINESS,
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        ownershipForm: faker.finance.transactionType(),
        positionInCompany: faker.person.jobTitle(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        socialMedia: {
            website: faker.internet.url(),
            phone: faker.phone.number(),
            facebook: 'https://www.facebook.com/groups/Coffeerocks/',
            telegram: faker.internet.url(),
            whatsapp: faker.internet.url(),
            instagram: faker.internet.url(),
            vk: faker.internet.url(),
            tiktok: faker.internet.url(),
            youtube: faker.internet.url(),
            twitter: faker.internet.url(),
            reddit: faker.internet.url(),
            wechat: faker.internet.url(),
        },
        employees: getFakeEmployeeInfo(5),
        description: faker.lorem.paragraphs(2),
        documents: getFakeDocuments(),
        logo: faker.image.urlLoremFlickr({ category: 'logo' }),
        financialInfo: {
            annualTurnover: faker.number.int({ min: 1000, max: 10000000 }),
            foundationYear: faker.date.past().getFullYear(),
            grossRevenue: faker.number.int({ min: 1000, max: 10000000 }),
        }
    }
}


export const getFakeCharityData = (seed = 0): ICharityOrganization => {
    faker.seed(seed);
    return {

        verified: faker.helpers.arrayElement([true, false]),
        rating: faker.number.int({ min: 0, max: 5 }),
        type: OrganizationType.CHARITY,
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        ownershipForm: faker.finance.transactionType(),
        positionInCompany: faker.person.jobTitle(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        socialMedia: {
            website: faker.internet.url(),
            phone: faker.phone.number(),
            facebook: 'https://www.facebook.com/groups/Coffeerocks/',
            telegram: faker.internet.url(),
            whatsapp: faker.internet.url(),
            instagram: faker.internet.url(),
            vk: faker.internet.url(),
            tiktok: faker.internet.url(),
            youtube: faker.internet.url(),
            twitter: faker.internet.url(),
            reddit: faker.internet.url(),
            wechat: faker.internet.url(),
        },
        employees: getFakeEmployeeInfo(5),
        description: faker.lorem.paragraphs(2),
        documents: getFakeDocuments(),
        logo: faker.image.urlLoremFlickr({ category: 'logo' }),
    }
}


export const getFakeStartupData = (seed = 0): IStartupOrganization => {
    faker.seed(seed);
    const requiredFunding = faker.number.int({ min: 1000, max: 10000000 });
    const raisedFunding = faker.number.int({ min: 1000, max: requiredFunding * 1.2 });
    return {

        verified: faker.helpers.arrayElement([true, false]),
        rating: faker.number.int({ min: 0, max: 5 }),
        type: OrganizationType.STARTUP,
        id: faker.string.uuid(),
        companyName: faker.company.name(),
        ownershipForm: faker.finance.transactionType(),
        positionInCompany: faker.person.jobTitle(),
        country: faker.location.country(),
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        socialMedia: {
            website: faker.internet.url(),
            phone: faker.phone.number(),
            facebook: 'https://www.facebook.com/groups/Coffeerocks/',
            telegram: faker.internet.url(),
            whatsapp: faker.internet.url(),
            instagram: faker.internet.url(),
            vk: faker.internet.url(),
            tiktok: faker.internet.url(),
            youtube: faker.internet.url(),
            twitter: faker.internet.url(),
            reddit: faker.internet.url(),
            wechat: faker.internet.url(),
        },
        employees: getFakeEmployeeInfo(5),
        description: faker.lorem.paragraphs(2),
        documents: getFakeDocuments(),
        logo: faker.image.urlLoremFlickr({ category: 'logo' }),
        fundingInfo: {
            raisedFunding,
            requiredFunding,
            slideDeck: getFakeSlideDeck(5)
        }
    }
}

const getFakeSlideDeck = (count: number): any => {
    let slides = [];
    for (let i = 0; i < count; i++) {
        slides.push({
            type: 'image',
            src: faker.image.urlLoremFlickr({ category: 'startup' }),
            label: faker.system.commonFileName(),
            file: {
                url: faker.image.urlLoremFlickr({ category: 'startup' }),
                name: faker.system.commonFileName(),
                type: 'image/png',
                id: faker.string.uuid(),
            }
        })
    }
    return slides;
}


export const getFakeOrganizationData = (seed = 0, type?: OrganizationType): IOrganization => {
    faker.seed(seed);
    const fakeType = type || faker.helpers.arrayElement([OrganizationType.BUSINESS, OrganizationType.CHARITY, OrganizationType.STARTUP]);

    switch (fakeType) {
        case OrganizationType.BUSINESS:
            return getFakeBusinessData(seed);
        case OrganizationType.CHARITY:
            return getFakeCharityData(seed);
        case OrganizationType.STARTUP:
            return getFakeStartupData(seed);
    }
}


const getFakeDocuments = (): IOrganizationDocuments => {

    return {
        logo: {
            url: faker.image.urlLoremFlickr({ category: 'business' }),
            name: faker.system.commonFileName(), type: 'image/png',
            id: faker.string.uuid(),
        },
        presentation: {
            url: faker.image.urlLoremFlickr({ category: 'business' }),
            name: faker.system.commonFileName(),
            type: 'image/png',
            id: faker.string.uuid(),
        },
        companyCard: {
            url: faker.image.urlLoremFlickr({ category: 'business' }),
            name: faker.system.commonFileName(), type: 'image/png',
            id: faker.string.uuid(),
        },
        taxReturn: {
            url: faker.image.urlLoremFlickr({ category: 'business' }),
            name: faker.system.commonFileName(), type: 'image/png',
            id: faker.string.uuid(),
        },
        financialIndicators: {
            url: faker.image.urlLoremFlickr({ category: 'business' }),
            name: faker.system.commonFileName(), type: 'image/png',
            id: faker.string.uuid(),
        },
        additionalDocuments: [
            {
                url: faker.image.urlLoremFlickr({ category: 'business' }),
                name: faker.system.commonFileName(), type: 'image/png',
                id: faker.string.uuid(),
            },
            {
                url: faker.image.urlLoremFlickr({ category: 'business' }),
                name: faker.system.commonFileName(), type: 'image/png',
                id: faker.string.uuid(),
            },
            {
                url: faker.image.urlLoremFlickr({ category: 'business' }),
                name: faker.system.commonFileName(), type: 'image/png',
                id: faker.string.uuid(),
            },
        ]
    }
}

const getFakeEmployeeInfo = (count: number): IEmployeeInfo[] => {

    const employees: IEmployeeInfo[] = [];
    for (let i = 0; i < count; i++) {
        employees.push({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            futurumAccount: faker.internet.email(),
            link: faker.internet.url(),
            phone: faker.phone.number(),
            telegram: faker.internet.url(),
            avatar: { url: faker.image.avatar(), id: faker.string.uuid(), name: faker.system.commonFileName(), type: 'image/png' },
        })
    }
    return employees;
}