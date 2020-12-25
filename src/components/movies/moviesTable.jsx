import React, { Component } from 'react';
import Table from '../common/table/table';
import Like from '../common/like';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => {
        return (
          <Like
            liked={movie.liked}
            onLikeToggle={() => this.props.onLikeToggle(movie)}
          />
        );
      }
    },
    {
      key: 'edit',
      content: (movie) => {
        return (
          <Link className="btn btn-warning btn-sm" to={`/movies/${movie._id}`}>
            Edit
          </Link>
        );
      }
    },
    {
      key: 'delete',
      content: (movie) => {
        return (
          <button
            onClick={() => this.props.onDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        );
      }
    }
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
