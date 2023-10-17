import { useEffect } from 'react';
import React, { useState } from 'react';
import Loader from 'components/Loader';
import Filter from 'components/Filter';
import Products from 'components/Products';
import AddProduct from 'components/Modals/AddProduct';
import OrderList from 'components/Modals/OrderList';
import Cart from 'components/Cart';
import { useProducts } from 'contexts/products-context';
import * as S from './style';
import LoginForm from 'components/Login/Login';
import Button from 'react-bootstrap/Button';

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);

  const handleLogin = (username: string, password: string) => {
    const userData = {
      username: username,
      password: password,
      // Other user data
    };
    axios
      .post('http://localhost:8000/auth/login/', userData)
      .then(function (response) {
        if (response.data) {
          setIsLoggedIn(true);
          console.log(response.data);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('is_staff', response.data.is_staff);
          localStorage.setItem('idx', response.data.id);
          localStorage.setItem(
            'username',
            response.data['first_name'] + ' ' + response.data['last_name']
          );
        } else {
          alert('Invalid username or password');
        }
      });
  };
  const { isFetching, products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container>
      <ToastContainer />
      {isFetching && <Loader />}

      {isLoggedIn || localStorage.getItem('token') ? (
        <>
          <S.TwoColumnGrid>
            <S.Side>
              {/* <h1>TechLaps</h1> */}
              <S.Logo src="https://techlaps.net/wp-content/uploads/2023/04/original.png" />

              <hr></hr>
              <h4>
                Hoşgeldiniz, {localStorage.getItem('username')}!<br></br>
                <br></br>
                <br></br>
              </h4>
              {/* Ürün Ekle */}
              <Filter />
              <div>
                {localStorage.getItem('is_staff') === 'true' ? (
                  <Button onClick={() => setOpen(true)} variant="success">
                    Ürün Ekle
                  </Button>
                ) : (
                  ''
                )}
                <Modal open={open} onClose={() => setOpen(false)} center>
                  <AddProduct />
                </Modal>
              </div>
              <br></br>
              {/* Siparişler */}

              <S.ItemDiv>
                <p onClick={() => setOpen1(true)}>
                  {localStorage.getItem('is_staff') === 'true' ? (
                    <Button variant="primary">Müşteri Siparişleri</Button>
                  ) : (
                    <Button variant="primary">Siparişlerim</Button>
                  )}
                </p>
                <Modal open={open1} onClose={() => setOpen1(false)} center>
                  <OrderList />
                </Modal>
              </S.ItemDiv>
              <S.ItemDiv>
                {' '}
                <Button
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.reload();
                  }}
                  variant="danger"
                >
                  Çıkış
                </Button>
              </S.ItemDiv>
            </S.Side>

            <S.Main>
              <S.MainHeader>
                <p>{products?.length} ürün(ler) mevcut.</p>
              </S.MainHeader>
              <Products products={products} />
            </S.Main>
          </S.TwoColumnGrid>
          <Cart />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </S.Container>
  );
}

export default App;
