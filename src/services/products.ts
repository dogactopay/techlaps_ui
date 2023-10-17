import axios from 'axios';
import { IGetProductsResponse } from 'models';

const isProduction = process.env.NODE_ENV === 'production';

export const getProducts = async () => {
  let response: IGetProductsResponse;

  if (!isProduction) {
    response = await axios.get(
      'http://localhost:8000/products/?format=json'
    );
  } else {
    response = require('static/json/products.json');
  }

  const  products  = response.data ;
  console.log(products)
  return products;
};
