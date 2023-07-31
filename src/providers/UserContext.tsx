import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface IUserContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  userLogin: (formData: ILogin) => Promise<void>;
  userRegister: (formData: IRegister) => Promise<void>;
  userLogout: () => void;
}

interface IChildren {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string,
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: IChildren) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  const checkLogin = async () => {
    const token = localStorage.getItem('@TOKEN');
    const id = localStorage.getItem('@USERID');

    if (token) {
      try {
        setLoading(true);
        const response = await api.get<IUser>(`/users/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        navigate('/shop');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@USERID');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const userLogin = async (formData: ILogin) => {
    try {
      setLoading(true);
      const response = await api.post('/login', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      navigate('/shop');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (formData: IRegister) => {
    try {
      setLoading(true);
      const response = await api.post('/users', formData);
      setUser(response.data.user);
      localStorage.setItem('@TOKEN', response.data.accessToken);
      localStorage.setItem('@USERID', response.data.user.id);
      navigate('/shop');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    setUser(null);
    localStorage.removeItem('@TOKEN');
    localStorage.removeItem('@USERID');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        user,
        setUser,
        userLogin,
        userRegister,
        userLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
