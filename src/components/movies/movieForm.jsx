import React from 'react';
import Joi from 'joi-browser';

import Form from '../common/form/form';
import { getGenres } from '../../services/fakeGenreService';
import { getMovie, saveMovie } from '../../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewmodel(movie) });
  }

  mapToViewmodel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    // Redirect to Movies page after saving a new Movie.
    this.props.history.replace('/movies');
    // With "replace" method, browser Back button won't work.
    // i.e. previous URL (history) will be replaced (overridden).
    // But with "push" method, if you click the browser Back button, it will be redirected back to the Add Movie form.
    // i.e. previous URL (history) will be saved.
    // this.props.history.push("/movies") />
  };

  render() {
    return (
      <React.Fragment>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('title', 'Title')}
          {this.renderSelectField('genreId', 'Genre', this.state.genres)}
          {this.renderTextField('numberInStock', 'Stock')}
          {this.renderTextField('dailyRentalRate', 'Rate')}

          {this.renderButton('Save')}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieForm;
