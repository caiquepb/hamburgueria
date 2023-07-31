import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ProductContext } from '../../providers/ProductsContext';

const ProductList = () => {
  const { products, search } = useContext(ProductContext);

  return (
    <StyledProductList>
      {search.length === 0
        ? products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : search.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </StyledProductList>
  );
};

export default ProductList;
