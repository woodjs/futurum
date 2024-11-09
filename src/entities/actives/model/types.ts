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