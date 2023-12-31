import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function EditProduct(datak: any) {
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
        image: data.image,
        price: data.price,
        currencyFormat: data.currencyFormat,
        desi: data.desi,

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
      <h1>Ürün Ekle</h1>
      <hr />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ürün Adı</Form.Label>
          <Form.Control
            defaultValue={datak.title}
            {...register("title", { required: true })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Resim</Form.Label>
          <Form.Control
            defaultValue={datak.image}
            {...register("image", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Fiyat</Form.Label>
          <Form.Control
            defaultValue={datak.price}
            {...register("price", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Para Birimi</Form.Label>
          <Form.Control
            defaultValue={datak.currencyFormat}
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
            defaultValue={datak.desi}
            {...register("desi", { required: false })}
            type="text"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stok Miktarı</Form.Label>
          <Form.Control
            defaultValue={datak.stock_qty}
            {...register("stock_qty", { required: false })}
            type="number"
          />
        </Form.Group>
        <Button type="submit">Değiştir</Button>
        <Button onClick={() => onDelete()} variant="danger">
          Sil
        </Button>
      </Form>
    </>
  );
}
export default EditProduct;
