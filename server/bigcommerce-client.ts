import axios from 'axios';
import type { BigCommerceConfig, CartItem, BigCommerceProduct } from '@shared/bigcommerce';

export class BigCommerceClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor(private config: BigCommerceConfig) {
    this.baseUrl = `https://api.bigcommerce.com/stores/${config.storeHash}/v3`;
    this.headers = {
      'X-Auth-Token': config.accessToken,
      'Content-Type': 'application/json',
    };
  }

  async createCart(items: CartItem[]) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/carts`,
        { line_items: items.map(this.transformCartItem) },
        { headers: this.headers }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create cart:', error);
      throw new Error('Failed to create cart in BigCommerce');
    }
  }

  async getProduct(productId: string): Promise<BigCommerceProduct> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/catalog/products/${productId}`,
        { headers: this.headers }
      );
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      throw new Error('Failed to fetch product from BigCommerce');
    }
  }

  private transformCartItem(item: CartItem) {
    return {
      product_id: parseInt(item.productId),
      variant_id: item.variantId ? parseInt(item.variantId) : undefined,
      quantity: item.quantity,
      option_selections: [
        {
          name: 'Base Width',
          value: item.customFields.baseWidth,
        },
        {
          name: 'Height',
          value: item.customFields.height.toString(),
        },
        {
          name: 'Surface Treatment',
          value: item.customFields.surfaceTreatment,
        },
        {
          name: 'Hardware',
          value: item.customFields.hardware,
        },
      ],
    };
  }
}
