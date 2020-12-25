import React from 'react';
import Joi from 'joi-browser';
import Form from '../common/form/form';
import genreService from '../../services/genreService';
import movieService from '../../services/movieService';

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

  async componentDidMount() {
    // Populate Genres
    const { data: genres } = await genreService.getGenres();
    this.setState({ genres: genres });

    // FIXME - Review code block
    const { data: movies } = await movieService.getMovies();
    this.setState({ movies: movies });
    // ---------------------------------

    // Populate Movie Form when editing a Movie (If the Movie Id is valid).
    // Otherwise, redirect to Page not Found.
    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    try {
      const { data: movie } = await movieService.getMovie(movieId);
      this.setState({ data: this.mapToViewmodel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace('/not-found');
    }
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

  doSubmit = async () => {
    const movieId = this.props.match.params.id;

    let resp;
    let movies;
    if (movieId === 'new') {
      // Create movie
      resp = await movieService.saveMovie(this.state.data);

      movies = [resp.data, ...this.state.movies];
    } else {
      // Edit movie
      resp = await movieService.updateMovie(movieId, this.state.data);

      movies = { ...this.state.movies };
      const index = movies.indexOf(movies.filter((m) => m._id === movieId));
      movies[index] = { ...resp.data };
    }

    this.setState({ movies: movies });

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
