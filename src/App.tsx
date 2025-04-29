import { BrowserRouter, useRoutes } from 'react-router-dom';
import { routes } from './routes/routes';

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
