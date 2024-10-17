import { ISocialMediaLinks } from "../model";

export const getIdFromLink = (link: string, key: keyof ISocialMediaLinks) => {
    if (link) {
        const id = link.split('/').reverse().filter(x => x)[0] || 'Ссылка';
        return id
    }
}
