import { IOrganization, IOrganizationFormData, OrganizationType } from "../model"

const organizationToForm = (
    organization: IOrganization,
): IOrganizationFormData => {
    switch (organization.type) {
        case OrganizationType.STARTUP:
            return {
                type: OrganizationType.STARTUP,
                address: {
                    address: organization.address,
                    city: organization.city,
                    country: organization.country,
                },
                company: {
                    companyName: organization.companyName,
                    ownershipForm: organization.ownershipForm,
                    position: organization.positionInCompany,
                },
                description: { description: organization.description },
                files: {
                    logo: [organization.documents.logo],
                    additionalDocuments: organization.documents.additionalDocuments,
                    companyCard: organization.documents.companyCard && [
                        organization.documents.companyCard,
                    ],
                    financialIndicators: organization.documents.financialIndicators && [
                        organization.documents.financialIndicators,
                    ],
                    presentation: organization.documents.presentation && [
                        organization.documents.presentation,
                    ],
                    taxReturn: organization.documents.taxReturn && [
                        organization.documents.taxReturn,
                    ],
                },
                startPage: {
                    amountForStart: organization.fundingInfo.requiredFunding,
                    files: organization.fundingInfo.slideDeck?.map(slide => slide.file),
                },
                contact: {
                    ...organization.socialMedia,
                },
                employees: organization.employees && {
                    employees: organization.employees.map(employee => ({
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        phone: employee.phone,
                        telegram: employee.telegram,
                        link: employee.link,
                        futurumAccount: employee.futurumAccount,
                        avatar: employee.avatar && [
                            {
                                type: employee.avatar.type,
                                id: employee.avatar.id,
                                name: employee.avatar.name,
                                url: employee.avatar.url,
                            },
                        ],
                    })),
                },
            }
        case OrganizationType.BUSINESS:
            return {
                type: OrganizationType.BUSINESS,
                address: {
                    address: organization.address,
                    city: organization.city,
                    country: organization.country,
                },
                company: {
                    companyName: organization.companyName,
                    ownershipForm: organization.ownershipForm,
                    position: organization.positionInCompany,
                },
                description: { description: organization.description },
                files: {
                    logo: [organization.documents.logo],
                    additionalDocuments: organization.documents.additionalDocuments,
                    companyCard: organization.documents.companyCard && [
                        organization.documents.companyCard,
                    ],
                    financialIndicators: organization.documents.financialIndicators && [
                        organization.documents.financialIndicators,
                    ],
                    presentation: organization.documents.presentation && [
                        organization.documents.presentation,
                    ],
                    taxReturn: organization.documents.taxReturn && [
                        organization.documents.taxReturn,
                    ],
                },
                financial: {
                    ...organization.financialInfo,
                },
                contact: {
                    ...organization.socialMedia,
                },
                employees: organization.employees && {
                    employees: organization.employees.map(employee => ({
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        phone: employee.phone,
                        telegram: employee.telegram,
                        link: employee.link,
                        futurumAccount: employee.futurumAccount,
                        avatar: employee.avatar && [
                            {
                                type: employee.avatar.type,
                                id: employee.avatar.id,
                                name: employee.avatar.name,
                                url: employee.avatar.url,
                            },
                        ],
                    })),
                },
            }
        default:
        case OrganizationType.CHARITY:
            return {
                type: OrganizationType.CHARITY,
                address: {
                    address: organization.address,
                    city: organization.city,
                    country: organization.country,
                },
                company: {
                    companyName: organization.companyName,
                    ownershipForm: organization.ownershipForm,
                    position: organization.positionInCompany,
                },
                description: { description: organization.description },
                files: {
                    logo: [organization.documents.logo],
                    additionalDocuments: organization.documents.additionalDocuments,
                    companyCard: organization.documents.companyCard && [
                        organization.documents.companyCard,
                    ],
                    financialIndicators: organization.documents.financialIndicators && [
                        organization.documents.financialIndicators,
                    ],
                    presentation: organization.documents.presentation && [
                        organization.documents.presentation,
                    ],
                    taxReturn: organization.documents.taxReturn && [
                        organization.documents.taxReturn,
                    ],
                },
                contact: {
                    ...organization.socialMedia,
                },
                employees: organization.employees && {
                    employees: organization.employees.map(employee => ({
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        phone: employee.phone,
                        telegram: employee.telegram,
                        link: employee.link,
                        futurumAccount: employee.futurumAccount,
                        avatar: employee.avatar && [
                            {
                                type: employee.avatar.type,
                                id: employee.avatar.id,
                                name: employee.avatar.name,
                                url: employee.avatar.url,
                            },
                        ],
                    })),
                },
            }
    }
}

export { organizationToForm }