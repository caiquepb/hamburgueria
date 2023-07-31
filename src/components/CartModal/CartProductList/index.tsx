import { useContext } from 'react';
import CartProductCard from './CartProductCard';
import { StyledCartProductList } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph } from '../../../styles/typography';
import { CartContext } from '../../../providers/CartContext';

const CartProductList = () => {
  const { cartList, setCartList } = useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {cartList.map((cart) => (
          <CartProductCard key={cart.id} cart={cart} />
        ))}
      </ul>
      <div className='totalBox'>
        <StyledParagraph>
          <strong>Total</strong>
        </StyledParagraph>
        <StyledParagraph className='total'>{cartList
          .reduce(
            (previousValue, currentValue) => previousValue + currentValue.price,
            0
          )
          .toLocaleString("pt-Br", {
            style: "currency",
            currency: "BRL",
          })}</StyledParagraph>
      </div>
      <StyledButton $buttonSize='default' $buttonStyle='gray' onClick={() => setCartList([])}>
        Remover todos
      </StyledButton>
    </StyledCartProductList>
  );
};

export default CartProductList;
