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

function OrderList() {
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
      .get("http://localhost:8000/orders/", config)
      .then(function (response) {
        setOrder(response.data);
      });
  }, []);

  return (
    <>
      <h1>Siparişler</h1>
      <Accordion defaultActiveKey="0">
        {order.map((item, i) => {
          return (
            <>
              <Accordion.Item eventKey={`${i}`}>
                <Accordion.Header>
                  <Table>
                    <thead>
                      <tr>
                        <th>Tarih</th>
                        <th colSpan={2}>Kullanıcı</th>
                        <th>Durum</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatDate(item.created)}</td>
                        <td colSpan={2}>{item.username}</td>
                        <td>{statuses[item.status]}</td>
                      </tr>
                    </tbody>
                  </Table>
                  {item.status === 0 &&
                  localStorage.getItem("is_staff") === "true" ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => editOrder(item.id, item.content, 1)}
                      >
                        Onayla
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => editOrder(item.id, item.content, 1)}
                      >
                        Reddet
                      </Button>
                    </>
                  ) : (
                    ""
                  )}

                  <br></br>
                  <br></br>

                  <br></br>
                </Accordion.Header>
                <Accordion.Body>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th colSpan={2}>Ürün Adı</th>
                        <th>Miktar</th>
                        <th>Fiyat</th>
                        <th>Toplam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.content.map((item1: any, i1: any) => {
                        return (
                          <tr>
                            <td>{i1 + 1}</td>
                            <td colSpan={2}>{item1.title}</td>
                            <td>{item1.quantity}</td>
                            <td>{item1.price}{item1.currencyFormat}</td>
                            <td>{item1.price * item1.quantity}{item1.currencyFormat}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
            </>
          );
        })}
      </Accordion>
      <hr />
    </>
  );
}
export default OrderList;
