import { IFile } from "@/shared/ui/file-list";
import { ActiveType } from "./active-type";

export interface IActiveIdOrganization {
    id: string;
    logoId: string;
    position: string;
    companyName: string;
    ownershipForm: string;
    country: string;
    city: string;
    address: string;
    foundationYear: number;
    description: string;
    createdAt: string; // Можно использовать Date, если требуется преобразование
    updatedAt: string; // Можно использовать Date, если требуется преобразование
    categoryId: string;
    userId: number;
    __entity: string;
}
export interface IActiveIdDocumentId {
    uuid: string;
}
export interface IActiveIdGaleryImagesId {
    uuid: string;
}
export interface IActiveIdTag {
    tag: string;
}
export interface IActiveIdCollection {
    id: string;
    name: string;
    color: string;
    userId: number;
    __entity: string;
}
export interface IActiveByIdResponse {
    id: string;
    activeName: string;
    cathegory: string;
    description: string;
    documents: string[];
    endingDate: string;
    galeryImages: string[];
    headline: string;
    minContribution: number;
    nft: string;
    organization: IActiveIdOrganization;
    purposeCollection: number;
    tags: string[];
    collection: IActiveIdCollection;
}
export interface IActiveByIdResponseData {
    data: IActiveByIdResponse;
}
export interface IActiveListTag {
    tag: string;
}
export interface IActiveListDocLink {
    document: string;
}

export interface IActiveListGaleryImageLink {
    galeryImage: string;
}
export interface IActiveListcollection {
    id: string;
    name: string;
    color: string;
    userId: number;
    __entity: string;
}
export interface IActiveList {
    id: string;
    cathegory: string;
    organization: string;
    activeName: string;
    headline: string;
    description: string;
    tags: IActiveListTag[];
    minContribution: number;
    purposeCollection: number;
    endingDate: string;
    documents: IActiveListDocLink[];
    nft: string;
    galeryImages: IActiveListGaleryImageLink[]
}

export interface IActiveListResponse{
    data: IActiveList[];
    hasNextPage: boolean;
}

export interface IActiveResponse2 {
    id: string;
    activeName: string;
    cathegory: string;
    description: string;
    documentIds: string[];
    endingDate: string;
    galeryImagesIds: string;
    headline: string;
    minimumContribution: number | null; // Учитываем, что это может быть null
    nft: string;
    organizationId: string;
    purposeOfCollection: number;
    tags: string[];
    collection: IActiveIdCollection;
    price: number;
    profitability: number;
    payoutFrequency: string;
    refund: string;
    activityPeriod: number;
    withPossibilityOfExtension: boolean;
    additionalMaterials: string;
    fundUrl: string;
}

export interface IActiveDN2{
    data: IActiveResponse2;
}

export interface IActiveResponseDN2{
    data: IActiveResponse2[];
    hasNextPage: boolean;
}


export interface IOrganizationById {
    id: string;
    logoId: string;
    position: string;
    companyName: string;
    ownershipForm: string;
    country: string;
    city: string;
    address: string;
    foundationYear: number;
    description: string;
    createdAt: string;
    updatedAt: string;
    categoryId: string;
    userId: number;
    __entity: "OrganizationEntity";
  }

export interface IActiveResponseById2 {
    id: string;
    activeName: string;
    cathegory: string;
    description: string;
    documents: IFile[];
    endingDate: string;
    galeryImages: IFile[];
    headline: string;
    minimumContribution: number | null; // Учитываем, что это может быть null
    nft: IFile;
    organization: IOrganizationById;
    purposeOfCollection: number;
    tags: string[];
    collection: IActiveIdCollection;
    price: number;
    profitability: number;
    payoutFrequency: string;
    refund: string;
    activityPeriod: number;
    withPossibilityOfExtension: boolean;
    additionalMaterials: string;
    fundUrl: string;
}

export interface IActiveIdDN2{
    data: IActiveResponseById2;
}