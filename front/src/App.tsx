import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { createRouter } from 'router/router';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { initialize } from 'store/reducers/appSlice';
import Loader from 'components/Loader';

function App() {
  const { user } = useAppSelector(state => state.auth);
  const { isAppInitialized } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialize());
  }, [dispatch]);

  if (!isAppInitialized) {
    return <Loader />;
  }

  return <RouterProvider router={createRouter(!!user)} />;
}

export default App;
