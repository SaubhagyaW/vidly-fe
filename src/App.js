import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './app/components/navBar';
import ProtectedRoute from './app/components/common/protectedRoute';
import RegisterForm from './app/components/registerForm';
import LoginForm from './app/components/loginform';
import Logout from './app/components/logout';
import Profile from './app/components/profile';
import Movies from './app/components/movies/movies';
import MovieForm from './app/components/movies/movieForm';
import GenreForm from './app/components/genreForm';
import Customers from './app/components/customers';
import Rentals from './app/components/rentals';
import NotFound from './app/components/notFound';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import auth from './app/services/authService';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user: user });
  }

  render() {
    return (
      <main className="container">
        <ToastContainer />

        <NavBar user={this.state.user} />

        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <ProtectedRoute path="/logout" component={Logout} />
          <ProtectedRoute path="/profile" component={Profile} />

          {/* Path params. */}
          <ProtectedRoute path="/movies/:id" component={MovieForm} />
          <ProtectedRoute path="/movies" component={Movies} />
          <ProtectedRoute path="/genres/new" component={GenreForm} />

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

          <ProtectedRoute path="/customers" component={Customers} />
          <ProtectedRoute path="/rentals" component={Rentals} />

          {/* Redirect Home page to Movies page. */}
          <Redirect from="/" exact to="/movies" />

          {/* Page Not Found. */}
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
