import { FC, useState } from 'react';

import { useAppDispatch, useAuthGuard } from 'common/hooks';
import { login } from 'store/reducers/authSlice';
import Input from 'components/Input';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Login: FC = () => {
  useAuthGuard('default');

  const navigate = useNavigate();

  const [loginVal, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    await dispatch(
      login({
        email_login: loginVal,
        password,
      }),
    );

    navigate('/profile');
  };

  return (
    <div className="auth-container">
      <Link className="back" to="/">
        Назад
      </Link>
      <div className="title">Логин</div>
      <div className="form">
        <Input placeholder="Логин или почта" value={loginVal} setValue={setLogin} />
        <Input
          placeholder="Пароль"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button type="submit" onClick={onSubmit}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default Login;
