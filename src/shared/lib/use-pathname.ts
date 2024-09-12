import { usePathname as useNextPathname } from "next/navigation";

const localeRegex = /^\/[a-zA-Z]{2}(-[a-zA-Z]{2})?\b/;

const usePathname = () => {
    const pathname = useNextPathname();

    const match = pathname.match(localeRegex);

    if (match) {
        return pathname.replace(localeRegex, '') || '/';
    }

    return pathname;
}

export default usePathname;