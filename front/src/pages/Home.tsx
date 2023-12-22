import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <div className="home">
      <Link className='home-link' to="/auth/login">Вход</Link>
      <Link className='home-link' to="/auth/registration">Регистрация</Link>
    </div>
  );
};

export default Home;
