import { useEffect } from 'react';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RootDispatchType, RootStateType } from 'store/createStore';

export const useAppDispatch: () => RootDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export const useAuthGuard = (pageType: 'auth' | 'default' = 'auth') => {
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    console.log(pageType === 'auth' && !user);

    if (pageType === 'auth' && !user) navigate('/');
    if (pageType === 'default' && user) navigate('/profile');
  }, [user]);
};
