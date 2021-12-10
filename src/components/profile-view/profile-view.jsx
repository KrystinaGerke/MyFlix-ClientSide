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
<Form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          Birthday:
          <input type="birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Update</button>
      </Form>
          <Button>Deregister</Button>
       

    </Container>

)

}