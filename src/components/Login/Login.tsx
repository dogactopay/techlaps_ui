import * as S from './style';
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <>
      <S.Orta>
        <S.Logo src="https://techlaps.net/wp-content/uploads/2023/04/original.png" />

        <h2>Giriş Yap</h2>
        <div>
          <S.Price
            placeholder="Kullanıcı Adı"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <S.Price
            placeholder="Şifre"
            type="password"
            className="Price"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <S.BuyButton onClick={handleLogin}>Sepete Ekle</S.BuyButton>
      </S.Orta>
    </>
  );
};

export default LoginForm;
