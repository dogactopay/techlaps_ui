import { KeyboardEvent } from 'react';
import React, { useState } from 'react';
import OrderList from 'components/Modals/OrderList';

import formatPrice from 'utils/formatPrice';
import { IProduct } from 'models';
import 'react-responsive-modal/styles.css';

import { useCart } from 'contexts/cart-context';
import { Modal } from 'react-responsive-modal';

import * as S from './style';
import AddProduct from 'components/Modals/AddProduct';
import ProductDetail from 'components/Modals/ProductDetail';
import EditProduct from 'components/Modals/EditProduct';

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const { openCart, addProduct } = useCart();
  const {
    sku,
    id,
    title,
    price,
    installments,
    currencyId,
    currencyFormat,
    image,
    stock_qty,
    isFreeShipping,
  } = product;

  const formattedPrice = formatPrice(price, currencyId);
  let productInstallment;

  if (installments) {
    const installmentPrice = price / installments;

    productInstallment = (
      <S.Installment>
        <span>or {installments} x</span>
        <b>
          {currencyFormat}
          {formatPrice(installmentPrice, currencyId)}
        </b>
      </S.Installment>
    );
  }

  const handleAddProduct = () => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      addProduct({ ...product, quantity: 1 });
      openCart();
    }
  };

  return (
    <S.Container onKeyUp={handleAddProductWhenEnter} sku={sku} tabIndex={1}>
      {!stock_qty && <S.Stopper>Stok Mevcut Değil</S.Stopper>}
      {localStorage.getItem('is_staff') === 'true' ? (
        <S.StopperL onClick={() => setOpen(true)}>Düzenle</S.StopperL>
      ) : (
        ''
      )}
      <>
        <div>
          <Modal open={open} onClose={() => setOpen(false)} center>
            <EditProduct
              product_id={id}
              title={title}
              stock_qty={stock_qty}
              
            />
          </Modal>
        </div>
      </>
      {/* <S.Image alt={title} /> */}
      <S.Title onClick={() => setOpen1(true)}>{title}</S.Title>
      <>
        <div>
          <Modal open={open1} onClose={() => setOpen1(false)} center>
            <ProductDetail
              product_id={id}
              title={title}
              stock_qty={stock_qty}
              image={image}
            />
          </Modal>
        </div>
      </>
      <S.Price>
        <S.Val>
          {/* <b>{formattedPrice.substring(0, formattedPrice.length - 3)}</b> */}
          <span>{stock_qty} adet</span>
          <br></br>
          <small>Mevcut</small>
        </S.Val>
        {productInstallment}
      </S.Price>
      <S.BuyButton
        onClick={handleAddProduct}
        tabIndex={-1}
        disabled={!stock_qty}
      >
        Sepete Ekle
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
