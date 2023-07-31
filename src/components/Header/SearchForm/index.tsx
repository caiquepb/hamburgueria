import { MdSearch } from 'react-icons/md';
import { useContext } from 'react';
import { StyledSearchForm } from './style';
import { StyledButton } from '../../../styles/button';
import { ProductContext } from '../../../providers/ProductsContext';

const SearchForm = () => {
  const { filterProducts } = useContext(ProductContext);

  return (
    <StyledSearchForm>
      <input
        type='text'
        placeholder='Digitar pesquisa'
        onChange={(event) => filterProducts(event.target.value)}
      />
      <StyledButton type='submit' $buttonSize='medium' $buttonStyle='green'>
        <MdSearch />
      </StyledButton>
    </StyledSearchForm>
  );
};

export default SearchForm;
