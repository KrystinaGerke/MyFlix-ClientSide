import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';


export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflix-kg.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

return (
  <Container>
  <Form>
    <Form.Group className="mb-3" controlId="formUsername">
      <Form.Label>Username:</Form.Label>
      <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Label>Password:</Form.Label>
      <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
    </Form.Group>
    <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
      Login
    </Button>{' '}
    <Link className="mb-3" to={`/users`}>
    <Button variant="outline-dark">Register</Button>
</Link>
  </Form>
</Container>
);
}