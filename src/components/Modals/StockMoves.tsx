import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import * as S from "./style";

function StockMoves() {
  const [order, setOrder] = useState<any[]>([]);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR").format(date);
  };
  const statuses: any = {
    0: "Bekliyor ⏳",
    1: "Onaylandı ✅",
    2: "Onaylanmadı ❌",
    3: "Tamamlandı 🏁",
  };

  const editOrder = (data: any, content: any, status: number) => {
    axios
      .patch(`http://localhost:8000/orders/${data}/`, {
        content: content,
        status: status,
        id: data,

        // Other user data
      })
      .then(function (response) {
        toast.success(
          status === 1 ? "Sipariş Onaylandı!" : "Sipariş Onaylanmadı!"
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });

    console.log(content);
  };
  const config = {
    headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/stockmove/", config)
      .then(function (response) {
        setOrder(response.data);
      });
  }, []);

  return (
    <>
      <h1>Stok Hareketleri</h1>

      <Table>
        <thead>
          <tr>
            <th>Tarih</th>
            <th colSpan={2}>Ürün</th>
            <th>Hareket</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, i) => {
            return (
              <>
                <tr>
                  <td>{formatDate(item.created)}</td>
                  <td colSpan={2}>{item.product}</td>
                  <td>{item.move}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>

      <hr />
    </>
  );
}
export default StockMoves;
