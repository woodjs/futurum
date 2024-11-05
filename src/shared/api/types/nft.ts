export interface Collection {
    id: string;
    name: string;
    color: string;
    userId: number;
    __entity: string;
  }

export interface INft {
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    type: string;
    endingDate?: string;
    color?: string;
    category: string;
    minContribution?: number;
    tag: string;
    params: { title: string; value: string }[];
    author: {
        id: string;
        name: string;
        image: string;
    };
    collection: Collection
    expired: Date;
    likes: number;
    isLiked: boolean;
}
