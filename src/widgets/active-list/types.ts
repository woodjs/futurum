import { IActiveList, IActiveListDocLink, IActiveListGaleryImageLink, IActiveListTag } from "@/entities/actives";

export interface IActiveListProps {
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
    galeryImages: IActiveListGaleryImageLink[];
}

export interface IActiveData{
    data: IActiveListProps;
}

export interface ItemActiveProps {
    data: IActiveList;
    idlist: number;
}

export interface ButtonProps {
    uuid: string;
}