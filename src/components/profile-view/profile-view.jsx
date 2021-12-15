import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import './profile-view.scss';


export function ProfileView({ user, setUser, movies, onLoggedOut, onBackClick }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        props.handleRegistration(username);
      };
const token = localStorage.getItem("token");

      axios.put(`https://myflix-kg.herokuapp.com/users/${user.Username}`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
    }, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(response => {
            console.log(response.data);
            setUser(response.data);
            window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
            console.log('error updating the user')
        });

    const handleDelete = () => {
      axios.delete(`https://myflix-kg.herokuapp.com/users/${user.Username}`, {
        headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
            console.log(response.data);
            onLoggedOut()
            })
            .catch(err => {
            console.error(err)
            });
        }
const favoriteMovies = props.movies.map(movie => user.FavoriteMovies.includes(movie._id));

return (
    <Container>
<>
<Form.Floating className="mb-3"> 
        <label htmlFor="floatingUsernameCustom">Username</label>
        <Form.Control
          id="floatingUsernameCustom"
          type="username"
          placeholder="Username123"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Floating>

      <Form.Floating className="mb-3">
      <label htmlFor="floatingInputCustom">Email address</label>
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Floating>
      
      <Form.Floating className="mb-3">
      <label htmlFor="floatingPasswordCustom">Password</label>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Floating>
    
      <Form.Floating className="mb-3">
      <label htmlFor="floatingBirthdayCustom">Birthday</label>
        <Form.Control
          id="floatingBirthdayCustom"
          type="birthday"
          placeholder="05/25/1990"
          value={birthday} 
          onChange={e => setBirthday(e.target.value)}
        />
      </Form.Floating>
      <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Update</Button>

          <Button variant = "outline-danger" onClick={deleteUserHandler}>Deregister</Button>
    
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>De-Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to permenantly delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Whoops-Nevermind
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Deregister
          </Button>
        </Modal.Footer>
      </Modal>

      </>
    </Container>

)

}


// function DeleteProfile() {
//     const [show, setShow] = useState(false);
  
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);