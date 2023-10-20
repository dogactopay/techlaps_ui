import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    axios
      .post("http://localhost:8000/products/", {
        title: data.title,
        stock_qty: data.stock_qty,
        image: data.image,
        price: data.price,
        currencyFormat: data.currencyFormat,
        desi: data.desi,
        // Other user data
      })
      .then(function (response) {
        toast.success("Ürün Eklendi!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

    console.log(data);
  };

  return (
    <>
      <h1>Ürün Ekle</h1>
      <hr />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ürün Adı</Form.Label>
          <Form.Control
            {...register("title", { required: true })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Resim</Form.Label>
          <Form.Control
            {...register("image", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Fiyat</Form.Label>
          <Form.Control
          defaultValue={0}
            {...register("price", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Para Birimi</Form.Label>
          <Form.Control
            {...register("currencyFormat", { required: false })}
            as="select"
          >
            <option value="₺">₺</option>
            <option value="$">$</option>
            <option value="€">€</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Desi</Form.Label>
          <Form.Control
            {...register("desi", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stok Miktarı</Form.Label>
          <Form.Control
            {...register("stock_qty", { required: true })}
            type="number"
          />
        </Form.Group>
        <Button type="submit">Ekle</Button>
      </Form>
    </>
  );
}
export default AddProduct;
