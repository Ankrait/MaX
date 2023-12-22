import { FC, useState } from 'react';
import { useAppDispatch, useAuthGuard } from 'common/hooks';
import { registration } from 'store/reducers/authSlice';
import Input from 'components/Input';
import Button from 'components/Button';
import { Link, useNavigate } from 'react-router-dom';

const Registration: FC = () => {
  useAuthGuard('default');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    await dispatch(
      registration({
        email,
        login,
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
      <div className="title">Регистрация</div>

      <div className="form">
        <Input placeholder="Email" value={email} setValue={setEmail} />
        <Input placeholder="Логин" value={login} setValue={setLogin} />
        <Input
          placeholder="Пароль"
          type="password"
          value={password}
          setValue={setPassword}
        />
        <Button type="submit" onClick={onSubmit}>
          Регистрация
        </Button>
      </div>
    </div>
  );
};

export default Registration;
