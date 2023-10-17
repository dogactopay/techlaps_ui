import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import * as S from './style';

const Cart = () => {
  const { products, total, isOpen, openCart, closeCart } = useCart();

  const handleCheckout = () => {
    console.log(products);
    if (total.productQuantity) {
      const idx = localStorage.getItem('idx');
      axios
        .post('http://185.209.230.204:8000/products/get_cart/', {
          user: idx,
          order: products,
        })
        .then(function (response) {
          toast.success('Sipariş Onaya Gönderildi!');
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } else {
      alert('Add some product in the cart!');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle>Sepet</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} />

          <S.CartFooter>
            {/* <S.Sub>SUBTOTAL</S.Sub> */}
            <S.SubPrice>
              <S.SubPriceValue>
                Toplam Ürün Adedi : {total.productQuantity}
              </S.SubPriceValue>
            </S.SubPrice>
            <S.CheckoutButton onClick={handleCheckout} autoFocus>
              Gönder
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
