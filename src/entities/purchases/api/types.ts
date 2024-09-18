import { INft } from "@/shared/api/types"

interface IPurchaseOptions {
    category?: string
    fromDate?: string
    toDate?: string
    fromPrice?: number
    toPrice?: number
}

interface IPurchaseItem extends INft {

}