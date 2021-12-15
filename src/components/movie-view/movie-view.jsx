import React from 'react';
import { Button, Card } from 'react-bootstrap';
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
      <Card className="text-center" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.ImageURL} />
      <Card.Body>
        <Card.Title>Movie: {movie.Title}</Card.Title>
        <Card.Text>Description: {movie.Description}</Card.Text>
        <Link to={`/movies/directors/${movie.Director.Name}`}>
          <Button variant="outline-dark">Director</Button>{' '}
        </Link>
        <Link to={`/movies/genre/${movie.Genre.Name}`}>
          <Button variant="outline-dark">Genre</Button>{' '}
        </Link>
        <Button variant="outline-dark" >Add to Favorites</Button>
        <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
      </Card.Body>
    </Card>
    );
  }
}

{/* <div className="movie-view">
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
          <Button variant="outline-dark">Director</Button>{' '}
        </Link>
        <Link to={`/movies/genre/${movie.Genre.Name}`}>
          <Button variant="outline-dark">Genre</Button>{' '}
        </Link>
        <Button variant="outline-dark" onClick={() => { onBackClick(null); }}>Back</Button>
       </div> */}