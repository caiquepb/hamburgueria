import { useContext } from 'react';
import { StyledProductCard } from './style';
import { StyledButton } from '../../../styles/button';
import { StyledParagraph, StyledTitle } from '../../../styles/typography';
import { IProducts } from '../../../providers/ProductsContext';
import { CartContext } from '../../../providers/CartContext';

interface IProduct {
  product: IProducts;
}

const ProductCard = ({ product }: IProduct) => {
  const { addProductToCart } = useContext(CartContext);

  return (
    <StyledProductCard>
      <div className='imageBox'>
        <img src={product.img} alt={product.name} />
      </div>
      <div className='content'>
        <StyledTitle tag='h3' $fontSize='three'>
          {product.name}
        </StyledTitle>
        <StyledParagraph className='category'>
          {product.category}
        </StyledParagraph>
        <StyledParagraph className='price'>
          {product.price.toLocaleString('pt-Br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </StyledParagraph>
        <StyledButton
          $buttonSize='medium'
          $buttonStyle='green'
          onClick={() => addProductToCart(product)}
        >
          Adicionar
        </StyledButton>
      </div>
    </StyledProductCard>
  );
};

export default ProductCard;
