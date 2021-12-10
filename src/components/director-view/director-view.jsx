import React from 'react';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {


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
        const { director, onBackClick } = this.props;
console.log(director);
    return (
      <div className="movie-view">
          <h1>Director View</h1>
        <div className="movie-title">
          {/* <span className="label">Title: </span>
          <span className="value">{movie.Title}</span> */}
        </div>
        <div className="director-info">
          <span className="label">Director Bio: </span>
          <span className="value">{director.Name}</span>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}