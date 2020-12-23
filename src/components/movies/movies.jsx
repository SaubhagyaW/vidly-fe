import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import { PAGE_SIZE } from '../../util/constants';

import MoviesTable from './moviesTable';
import ListGroup from '../common/listGroup';
import Pagination from '../common/pagination';

import { paginate } from '../../util/pagination_util';
import { getMovies } from '../../services/fakeMovieService';
import { getGenres } from '../../services/fakeGenreService';
import SearchBox from '../common/searchBox';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: { _id: '', name: 'All Genres' },
    searchQuery: '',
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [this.state.selectedGenre, ...getGenres()];

    this.setState({
      movies: getMovies(),
      genres: genres
    });
  }

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      searchQuery: '',
      currentPage: 1
    });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedGenre: { _id: '', name: 'All Genres' },
      currentPage: 1
    });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDeleteMovie = (id) => {
    this.setState({ movies: this.state.movies.filter((m) => m._id !== id) });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn: sortColumn });
  };

  handleLikeToggle = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  getPagedData = () => {
    const {
      movies: allMovies,
      selectedGenre,
      searchQuery,
      currentPage,
      sortColumn
    } = this.state;

    // Filtering
    let filteredMovies = allMovies;
    if (searchQuery)
      filteredMovies = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filteredMovies =
        selectedGenre._id !== ''
          ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
          : allMovies;

    // Sorting
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    // Pagination
    const movies = paginate(sortedMovies, currentPage, PAGE_SIZE);

    return { totalMovies: filteredMovies.length, movies: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      genres,
      selectedGenre,
      searchQuery,
      currentPage,
      sortColumn
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalMovies, movies } = this.getPagedData();

    return (
      <div className="row">
        {/* div.col-2+div.col */}
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <Link
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
            to={`/movies/new`}
          >
            New Movie
          </Link>

          <p>
            Showing {movies.length}/{totalMovies} movies in the database.
          </p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSort}
            onLikeToggle={this.handleLikeToggle}
          />

          <Pagination
            itemsCount={totalMovies}
            pageSize={PAGE_SIZE}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
