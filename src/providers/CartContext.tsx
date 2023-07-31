import { createContext, useState } from 'react';

interface ICartContext {
  cart: boolean;
  setCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartList: ICartList[];
  setCartList: React.Dispatch<React.SetStateAction<ICartList[]>>;
  addProductToCart: (currentProduct: ICartList) => void;
  removeProductFromCart: (productId: ICartList) => void;
}

interface IChildren {
  children: React.ReactNode;
}

export interface ICartList {
  id: number;
  name: string;
  img: string;
  price: number
}

export const CartContext = createContext({} as ICartContext);

export const CartProvider = ({ children }: IChildren) => {
  const [cart, setCart] = useState(false);
  const [cartList, setCartList] = useState<ICartList[]>([]);

  const addProductToCart = (currentProduct: ICartList) => {
    if (
      !cartList.some((product: ICartList) => product.id === currentProduct.id)
    ) {
      setCartList([...cartList, currentProduct]);
      setCart(true)
    } else {
      // eslint-disable-next-line no-alert
      alert('Você já escolheu esse produto');
    }
  };

  const removeProductFromCart = (productId: ICartList) => {
    const newCart = cartList.filter((product: ICartList) => product.id !== productId.id);
    setCartList(newCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartList,
        setCartList,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
