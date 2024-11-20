// import { PurchaseStatusFilter } from '@/entities/purchases/api';
import { z } from 'zod'

// const ZodStatusFilter = z.nativeEnum(PurchaseStatusFilter);

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
)

const PurchaseParamsSchema = z.object({
  login: z.string(),
  email: z.coerce.string().email().min(5),
  name: z.string(),
  lastName: z.string(),
  country: z.string(),
  phone: z.string().regex(phoneRegex, 'Invalid Number!'),
  whatsapp: z.string(),
  telegram: z.string(),
})

export { PurchaseParamsSchema }
