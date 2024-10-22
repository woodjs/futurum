

interface IFormatter {
    format: (x: number | bigint | undefined) => string
    formatToParts: (x: number | bigint | undefined) => Intl.NumberFormatPart[]
    resolvedOptions: Intl.NumberFormat['resolvedOptions']
}


const getNoOpFormatter = (
    locale: string = 'default',
    options?: Intl.NumberFormatOptions
): IFormatter => ({
    format: (x: number | bigint | undefined) => x?.toString() || '',
    formatToParts: (x: number | bigint | undefined) => [
        { type: 'unknown' as Intl.NumberFormatPartTypes, value: x?.toString() || '' }
    ],
    resolvedOptions: new Intl.NumberFormat(locale, options).resolvedOptions
});


export const getCurrencyFormatter = (
    locale: string = 'default',
    options?: Intl.NumberFormatOptions
): Intl.NumberFormat | IFormatter => {
    try {
        return new Intl.NumberFormat(locale, options);
    } catch {
        if (options?.style === 'currency' && options?.currency) {
            const rootFormatter = new Intl.NumberFormat(locale, {
                ...options,
                currency: 'BTC'
            });

            return {
                format: (x: number | bigint | undefined) =>
                    rootFormatter
                        .formatToParts(x)
                        .map((part) =>
                            part.type === 'currency' ? options.currency : part.value
                        )
                        .join(''),
                formatToParts: (x: number | bigint | undefined) =>
                    rootFormatter.formatToParts(x).map((part) =>
                        part.type === 'currency'
                            ? ({
                                ...part,
                                value: options.currency
                            } as Intl.NumberFormatPart)
                            : part
                    ),
                resolvedOptions: rootFormatter.resolvedOptions
            };
        }

        return getNoOpFormatter(locale, options);
    }
};

type TLocale = 'ru' | 'en';

const getShortNumber = (
    number: number,
    locale: TLocale = 'en',
    currency?: string
): string => {
    const options: Intl.NumberFormatOptions = {
        notation: 'compact',
        compactDisplay: 'short'
    };

    if (currency) {
        options.style = 'currency';
        options.currency = currency;
    }

    const formatter = getCurrencyFormatter(locale, options);
    return formatter.format(number);
}


const getFormattedNumber = (
    number: number,
    locale: TLocale = 'en',
    currency?: string
) => {
    const options: Intl.NumberFormatOptions = {
        notation: 'compact',
        compactDisplay: 'long'
    };

    if (currency) {
        options.style = 'currency';
        options.currency = currency;
    }

    const formatter = getCurrencyFormatter(locale, options);
    return formatter.format(number);
}

export {
    getFormattedNumber
};

export default getShortNumber;