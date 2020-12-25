import React, { Component } from 'react';

class Like extends Component {
  render() {
    let faHeartClass = 'fa fa-heart';
    if (!this.props.liked) faHeartClass += '-o';
    /* <i className="fa fa-heart-o fa-5x"></i> */

    return (
      <i
        onClick={this.props.onLikeToggle}
        style={{ cursor: 'pointer' }}
        className={faHeartClass}
      ></i>
    );
  }
}

export default Like;
