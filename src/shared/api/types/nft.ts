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
    color?: string;
    category: string;
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
