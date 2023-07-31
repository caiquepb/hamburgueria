import { CartProvider } from './providers/CartContext';
import { ProductProvider } from './providers/ProductsContext';
import { UserProvider } from './providers/UserContext';
import Router from './routes';
import { GlobalStyles } from './styles/global';

const App = () => (
  <>
    <GlobalStyles />
    <UserProvider>
      <ProductProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </ProductProvider>
    </UserProvider>
  </>
);

export default App;
