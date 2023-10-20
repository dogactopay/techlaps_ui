export interface IProduct {
  id: number;
  sku: number;
  title: string;
  description: string;
  availableSizes: string[];
  style: string;
  price: number;
  stock_qty: number;
  installments: number;
  currencyId: string;
  currencyFormat: string;
  isFreeShipping: boolean;
  image: string;
  desi: string;
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface ICartTotal {
  productQuantity: number;
  installments: number;
  totalPrice: number;
  totalPriceStr: any;
  currencyId: string;
  currencyFormat: string;
}

export interface IGetProductsResponse {
  data: IProduct[];
}
