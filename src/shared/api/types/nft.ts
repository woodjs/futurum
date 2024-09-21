export interface INft {
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    type: string;
    category: string;
    params: { title: string; value: string }[];
    author: {
        id: string;
        name: string;
        image: string;
    };
    expired: Date;
    likes: number;
    isLiked: boolean;
}
