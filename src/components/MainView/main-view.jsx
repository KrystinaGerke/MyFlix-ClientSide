import React from 'react';
import axios from 'axios';
import { Row, Col, Navbar, Container, Nav, Button } from 'react-bootstrap';
import './main-view.scss';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";


class MainView extends React.Component {

        constructor(){
          super();
          this.state = {
            selectedMovie: null,
            register: null,
            user: null,
            favoriteMovies: []
          }
        }

        componentDidMount() {
          let accessToken = localStorage.getItem('token');
          if (accessToken !== null) {
            this.setState({
              user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
          }
        }

        addToFavoriteMovies = (id) =>{
          this.setState({favoriteMovies:[...this.state.favoriteMovies, id]})
        }

          /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
          onLoggedIn(authData) {
            console.log(authData);
            this.setState({
              user: authData.user.Username,
              favoriteMovies: authData.user.FavoriteMovies
            });
          
            localStorage.setItem('token', authData.token);
            localStorage.setItem('user', authData.user.Username);
            this.getMovies(authData.token);
          }

          //Log out function
          onLoggedOut() {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.setState({
              user: null,
            });
          }


          getMovies(token) {
            axios.get('https://myflix-kg.herokuapp.com/movies', {
              headers: { Authorization: `Bearer ${token}`}
            })
            .then(response => {
              this.props.setMovies(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
          }
        

          render() {
            const { favoriteMovies } = this.state;
            let { movies } = this.props;
            let { user } = this.state;

           return (
          
              <Router>
                <Navbar sticky="top" bg="light">
                <Container>
                <Navbar.Brand>
                  <Link to={"/"} className="bar">
                  MyFlix
                  </Link>
                  </Navbar.Brand>
                  <Button variant="outline-secondary" className="bar">
                    <Link onClick={this.onLoggedOut.bind(this)}>Log Out</Link>
                  </Button>
                  <Button variant="outline-secondary" className="bar">
                    <Link to={`/profile/${user}`}>Profile</Link>
                  </Button>
                </Container>
              </Navbar>
                
                <div className="main-view justify-content-md-center">
                  {/* Main Page or Log In */}
                  <Route exact path="/" render={() => {
                    if (!user) return <Row>
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  </Row>
                  if (movies.length === 0) return <div className="main-view" />;
                  return <MoviesList movies={movies}/>;
                    // return movies.map(m => (
                    //   <Col md={3} key={m._id}>
                    //     <MovieCard movie={m} />
                    //   </Col>
                    // ))
                  }} />

                  {/* registration page */}
                  <Route path='/users' render={() => {
                    if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />

                  {/* profile page to change info */}
                  <Route path='/profile' render={({ history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={12}>
                            <ProfileView user={user} setUser={user => this.setUser(user)}
                                favoriteMovies={movies.filter(movie => favoriteMovies.includes(movie._id))} onLoggedOut={() => this.onLoggedOut()} onBackClick={() => history.goBack()}
                            />
                        </Col>
                    }} />

                  {/* specific movie */}
                  <Route exact path="/movies/:movieId" render={({ match, history }) => {
                      if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                      if (movies.length === 0) return <div className="main-view" />;
                     return <Col md={8}>
                        <MovieView movie={movies.find(m => m._id === match.params.movieId)} addToFavoriteMovies={this.addToFavoriteMovies} onBackClick={() => history.goBack()} />
                      </Col>
                    }} />
                
                  {/* specific genre */}
                  <Route path="/movies/genre/:name" render={({ match, history }) => {
                      if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                          <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                        </Col>
                      }
                      } />
                 
                  {/* specific director */}
                  <Route path="/movies/directors/:name" render={({ match, history }) => {
                    if (!user) return <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                      </Col>
                      if (movies.length === 0) return <div className="main-view" />;
                      return <Col md={8}>
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                      </Col>
                    }
                    } />
                </div>
              </Router>
            );
          }
        }

  let mapStateToProps = state => {
  return { movies: state.movies }
  }


  export default connect(mapStateToProps, { setMovies } )(MainView);