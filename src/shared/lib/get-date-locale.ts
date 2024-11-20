import { ru, enUS } from 'date-fns/locale';

export const getDateLocale = (locale: string) => {
    switch (locale) {
        case 'ru':
            return ru
        case 'en':
            return enUS
        default:
            return enUS
    }
}