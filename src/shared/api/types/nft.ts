export interface INft {
    id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    type: string;
    category: string;
    author: {
        id: string;
        name: string;
        image: string;
    };
    likes: number;
    comments: number;
    views: number;
    isLiked: boolean;
}
