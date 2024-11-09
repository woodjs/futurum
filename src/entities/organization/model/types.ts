import { IFile } from "@/shared/ui/file-list";
import { OrganizationType } from "./organization-type";


interface IOrganizationBaseData {
    id: string;
    logo: string;
    positionInCompany: string;
    companyName: string;
    ownershipForm: string;
    country: string;
    city: string;
    address: string;
    description?: string;
    socialMedia?: ISocialMediaLinks;
    documents: IOrganizationDocuments;
    employees?: IEmployeeInfo[];
    type: OrganizationType;
    rating?: number;
    verified?: boolean;
}

interface ISocialMediaLinks {
    website?: string;
    phone?: string;
    facebook?: string;
    telegram?: string;
    whatsapp?: string;
    instagram?: string;
    vk?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string; // X (Twitter)
    reddit?: string;
    wechat?: string;
}


interface IOrganizationDocuments {
    logo: IFile;
    presentation?: IFile;
    companyCard?: IFile;
    taxReturn?: IFile;
    financialIndicators?: IFile;
    additionalDocuments?: IFile[];
}

interface IFinancialInfo {
    foundationYear: number; // Год основания
    annualTurnover: number; // Годовой оборот
    grossRevenue: number; // Массовая выручка
}

interface IEmployeeInfo {
    firstName: string; // Имя
    lastName: string; // Фамилия 
    futurumAccount: string; // Аккаунт в Futurum
    link: string; // Ссылка
    phone: string; // Телефон
    telegram: string; // Telegram
    avatar?: IFile;
}

interface ISlide {
    // label: string;
    // src: string;
    // type: 'image' | 'video';
    file: IFile;
}

export interface IFundingInfo {
    raisedFunding: number;
    requiredFunding: number; // Необходимо для старта
    slideDeck?: ISlide[];
}

interface IAdditionalInfo {
    additionalInfo: string;
}

interface IBusinessOrganization extends IOrganizationBaseData {
    financialInfo: IFinancialInfo;
    type: OrganizationType.BUSINESS;
}

interface IStartupOrganization extends IOrganizationBaseData {
    fundingInfo: IFundingInfo;
    type: OrganizationType.STARTUP;
}

interface ICharityOrganization extends IOrganizationBaseData {
    type: OrganizationType.CHARITY;
}

type IOrganization = IBusinessOrganization | IStartupOrganization | ICharityOrganization

export type {
    IOrganization,
    IBusinessOrganization,
    IStartupOrganization,
    ICharityOrganization,
    ISocialMediaLinks,
    IEmployeeInfo,
    IOrganizationDocuments,
    IFinancialInfo,
    IOrganizationBaseData
}