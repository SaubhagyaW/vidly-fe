import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form/form';
import genreService from '../services/genreService';

class GenreForm extends Form {
  state = {
    data: {
      name: ''
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string().required().label('Name')
  };

  async componentDidMount() {
    // FIXME - Review code block
    const { data: genres } = await genreService.getGenres();
    this.setState({ genres: genres });
    // ---------------------------------
  }

  doSubmit = async () => {
    const resp = await genreService.saveGenre(this.state.data);
    const genres = [resp.data, ...this.state.genres];
    this.setState({ genres: genres });

    this.props.history.replace('/movies');
  };

  render() {
    return (
      <React.Fragment>
        <h1>New Genre</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField('name', 'Name')}

          {this.renderButton('Save')}
        </form>
      </React.Fragment>
    );
  }
}

export default GenreForm;
