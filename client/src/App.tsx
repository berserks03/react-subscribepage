import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Api from './pages/api';
import Home from './pages/homePage';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/api">
          <Api />
        </Route>
        <Route path={["/", "/tutorials"]}>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
