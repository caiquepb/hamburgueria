import { useContext } from 'react';
import { MdDelete } from 'react-icons/md';
import { StyledCartProductCard } from './style';
import { StyledTitle } from '../../../../styles/typography';
import { CartContext, ICartList } from '../../../../providers/CartContext';

interface ICart {
  cart: ICartList;
}

const CartProductCard = ({ cart }: ICart) => {
  const { removeProductFromCart } = useContext(CartContext);
  return (
    <StyledCartProductCard>
      <div className='imageBox'>
        <img src={cart.img} alt={cart.name} />
      </div>
      <div className='contentBox'>
        <StyledTitle tag='h3' $fontSize='three'>
          {cart.name}
        </StyledTitle>
        <button
          type='button'
          aria-label='Remover'
          onClick={() => removeProductFromCart(cart)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
