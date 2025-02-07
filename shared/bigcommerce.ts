import { z } from "zod";

export const bigCommerceConfigSchema = z.object({
  storeHash: z.string(),
  accessToken: z.string(),
  clientId: z.string(),
  clientSecret: z.string(),
});

export type BigCommerceConfig = z.infer<typeof bigCommerceConfigSchema>;

// Cart integration types
export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  customFields: {
    baseWidth: string;
    height: number;
    depth: number;
    plateThickness: number;
    gussetThickness: number;
    surfaceTreatment: string;
    hardware: string;
  };
}

export interface BigCommerceProduct {
  id: number;
  name: string;
  price: number;
  sku: string;
  customFields: Record<string, unknown>;
}
