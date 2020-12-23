import './App.css';

import { Route, Switch, Redirect } from 'react-router-dom';

import NavBar from './components/navBar';
import LoginForm from './components/loginform';
import RegisterForm from './components/registerForm';
import Movies from './components/movies/movies';
import MovieForm from './components/movies/movieForm';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';

function App() {
  return (
    <main className="container">
      <NavBar />

      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />

        {/* Path params. */}
        <Route path="/movies/:id" component={MovieForm} />
        <Route path="/movies" component={Movies} />

        {/* Query String params. */}
        {/* No changes in the Route. */}
        {/* Can access this in the Component using; */}
        {/* import queryString from 'query-string' */}
        {/* import Customers from './components/customers';
            const { sortByimport } = queryString.parse(location.search); */}

        {/* Passing custom props. */}
        {/* <Route
            path="/customers"
            render={(props) => <Customers sortBy="newest" {...props} />}
          /> */}

        <Route path="/customers" component={Customers} />
        <Route path="/rentals" component={Rentals} />

        {/* Redirect Home page to Movies page. */}
        <Redirect from="/" exact to="/movies" />

        {/* Page Not Found. */}
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </main>
  );
}

export default App;
