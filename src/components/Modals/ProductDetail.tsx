import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import * as S from "./style";

function ProductDetail(datak: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    axios
      .patch(`http://localhost:8000/products/${datak.product_id}/`, {
        title: data.title,
        stock_qty: data.stock_qty,

        // Other user data
      })
      .then(function (response) {
        toast.success("Ürün Değişti!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

    console.log(data);
  };

  const onDelete = () => {
    if (window.confirm("Ürün silinsin mi?")) {
      axios
        .delete(`http://localhost:8000/products/${datak.product_id}/`)
        .then(function (response) {
          toast.success("Ürün Silindi!");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }
  };

  return (
    <>
      <h1>Ürün Detayı</h1>
      <hr />
      <h4>{datak.title}</h4>
      <h5>Stok Miktarı : {datak.stock_qty}</h5>
      <h5>
        Fiyat : {datak.price} {datak.currencyFormat}
      </h5>
      <h5>Desi : {datak.desi} </h5>
      <S.Img src={datak.image} />
    </>
  );
}
export default ProductDetail;
