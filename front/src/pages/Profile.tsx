import { useAppDispatch, useAppSelector, useAuthGuard } from 'common/hooks';
import Button from 'components/Button';
import Input from 'components/Input';
import { FC, useEffect, useState } from 'react';
import { getUser, setInfo } from 'store/reducers/appSlice';

const Profile: FC = ({}) => {
  const [age, setAge] = useState<number | undefined>(undefined);
  const [city, setCity] = useState('');
  const [sex, setSex] = useState<'MALE' | 'FEMALE' | null>(null);

  useAuthGuard('auth');

  const { userInfo } = useAppSelector(state => state.app);
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(
      setInfo({
        age: age || null,
        city,
        sex,
      }),
    );
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  useEffect(() => {
    setAge(userInfo?.age || undefined);
    setCity(userInfo?.city || '');
    setSex(userInfo?.sex || null);
  }, [userInfo]);

  return (
    <div>
      <div className="title">Профиль</div>
      <div className="form">
        Возраст:
        <Input
          placeholder="Возраст"
          value={age?.toString() || ''}
          setValue={val => setAge(+val)}
          type="number"
        />
				Город:
        <Input placeholder="Город" value={city} setValue={setCity} />
				Пол:
        <label htmlFor="radio1">
          <input
            checked={sex === 'MALE'}
            onChange={e => {
              if (e.currentTarget.checked) {
                setSex('MALE');
              }
            }}
            value="MALE"
            type="radio"
            name="radio"
            id="radio1"
          />
          Мужчина
        </label>
        <label htmlFor="radio2">
          <input
            onChange={e => {
              if (e.currentTarget.checked) {
                setSex('FEMALE');
              }
            }}
            checked={sex === 'FEMALE'}
            value="FEMALE"
            type="radio"
            name="radio"
            id="radio2"
          />
          Женщина
        </label>
        <Button onClick={onEdit}>Изменить</Button>
      </div>
    </div>
  );
};

export default Profile;
