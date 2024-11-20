
export const preprocessStringToNumber = (val: any) => {
    if (!val) {
        return undefined
    }

    if (typeof val === "string" && !isNaN(Number(val))) {
        return Number(val)
    }

    return val
}