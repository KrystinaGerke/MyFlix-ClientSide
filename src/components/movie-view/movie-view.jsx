import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {


    keypressCallback(event) {
        console.log(event.key);
      }
    
      componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
      }
    
      componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
      }

    render() {
        const { movie, onBackClick } = this.props;

let ImageURL= movie.ImageURL?movie.ImageURL:movie.ImagePath;

    return (
      <div className="movie-view">
          <h1>Movie View</h1>
        <div className="movie-poster">
          <img src={ImageURL} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Link to={`/movies/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/movies/genre/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}