export interface IFile {
  id?: string;
  name?: string;
  type?: string;
  url?: string;
  file?: File; // Добавьте это свойство, чтобы можно было передавать файл в FormData
}


// Определение схемы для данных формы
export interface FormFields {
    id?: number | any;
    cathegory?: string ;
    organizationId?: string;
    activeName?: string ;
    headline?: string ;
    description?: string;
    tags?: string[] | any;
    minContribution?: number;
    purposeCollection?: number ;
    endingDate?: string ;
    documentIds?: string[] | any;
    nftId?: string;
    galeryImagesIds?: string[] | any;
    category?: any;
    collectionId?: string;
}
