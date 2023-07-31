import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

interface IProductContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  search: IProducts[];
  setSearch: React.Dispatch<React.SetStateAction<IProducts[]>>;
  showProducts: () => Promise<void>;
  filterProducts: (input: string) => void;
}

interface IChildren {
  children: React.ReactNode;
}

export interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export const ProductContext = createContext({} as IProductContext);

export const ProductProvider = ({ children }: IChildren) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState<IProducts[]>([]);

  const navigate = useNavigate();

  const showProducts = async () => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      try {
        setLoading(true);
        const response = await api.get<IProducts[]>('/products', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        localStorage.removeItem('@TOKEN');
        localStorage.removeItem('@USERID');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    showProducts();
  }, []);

  const filterProducts = (input: string) => {
    const filteredProducts = products.filter((product: IProducts) =>
      product.name.toLowerCase().includes(input.toLowerCase())
    );
    setSearch(filteredProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        setLoading,
        products,
        setProducts,
        search,
        setSearch,
        showProducts,
        filterProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
