import { NFTCategory } from "@/shared/api/types";
import { z } from "zod";

export const ZodNFTCategory = z.nativeEnum(NFTCategory);