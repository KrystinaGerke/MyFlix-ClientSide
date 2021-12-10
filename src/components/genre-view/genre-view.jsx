import React from 'react';
import Button from 'react-bootstrap/Button';
import './genre-view.scss';

export class GenreView extends React.Component {


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
        const { genre, onBackClick } = this.props;
        
console.log(genre);
    return (
      <div className="movie-view">
          <h1>Genre View</h1>
        <div className="movie-title">
          {/* <span className="label">Title: </span>
          <span className="value">{movie.Title}</span> */}
        </div>
        <div className="director-info">
          <span className="label">Genre Info: </span>
          <span className="value">{genre.Name}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}