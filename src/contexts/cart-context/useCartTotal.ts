import { useCartContext } from "./CartContextProvider";
import { ICartProduct } from "models";

const useCartTotal = () => {
  const { total, setTotal } = useCartContext();

  const updateCartTotal = (products: ICartProduct[]) => {
    const productQuantity = products.reduce(
      (sum: number, product: ICartProduct) => {
        sum += product.quantity;
        return sum;
      },
      0
    );

    const totalPrice = products.reduce((sum: number, product: ICartProduct) => {
      sum += product.price * product.quantity;
      return sum;
    }, 0);

    // const result = data.reduce((acc, curr) => {
    //   const { category, value } = curr;

    //   if (acc[category]) {
    //     // If the category already exists, add the value to the existing total
    //     acc[category] += value;
    //   } else {
    //     // If the category doesn't exist, create a new key with the initial value
    //     acc[category] = value;
    //   }

    //   return acc;
    // }, {});
    const data = [
      { category: "A", value: 10 },
      { category: "B", value: 20 },
      { category: "A", value: 15 },
      { category: "C", value: 5 },
      { category: "B", value: 30 },
    ];

    const totalPriceStr = products.reduce((acc, item) => {
      const { currencyFormat, price, quantity } = item;
      if (acc[currencyFormat]) {
        acc[currencyFormat] += price * quantity;
      } else {
        acc[currencyFormat] = price * quantity;
      }
      return acc;
    }, {} as { [key: string]: number });

    // const totalPriceStr = products.reduce((a: string, b: ICartProduct) => {
    //   console.log(products);
    //   return "deneme";
    // }, "0");

    const installments = products.reduce(
      (greater: number, product: ICartProduct) => {
        greater =
          product.installments > greater ? product.installments : greater;
        return greater;
      },
      0
    );

    const total = {
      productQuantity,
      installments,
      totalPrice,
      totalPriceStr,
      currencyId: "USD",
      currencyFormat: "$",
    };

    setTotal(total);
  };

  return {
    total,
    updateCartTotal,
  };
};

export default useCartTotal;
