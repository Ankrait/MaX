import { useAppDispatch, useAppSelector } from 'common/hooks';
import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { logout } from 'store/reducers/authSlice';

const RootLayout: FC = () => {
  const { user } = useAppSelector(state => state.auth);

  const dispatch = useAppDispatch();

  const onExit = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="header">
        <div className="header-container">
          {user ? (
            <a onClick={onExit} className="header-link">
              Выход
            </a>
          ) : (
            <Link to="/profile" className="header-link">
              Профиль
            </Link>
          )}
        </div>
      </div>

      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
