import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ birthday, setBirthday ] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(username, password);
      /* Send a request to the server for authentication */
      props.handleRegistration(username, email, password, birthday);
  
  
    axios.post('https://myflix-kg.herokuapp.com/users', {
      Username: username,
      Email: email,
      Password: password,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    })
    .catch(e => {
      console.log('error registering the user')
    });
  };
    return (
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
    
      <Button variant="outline-dark" type="submit" onClick={handleSubmit}>Register</Button>{' '}

      <Link className="mb-3" to={`/`}>
    <Button variant="outline-dark">Login</Button>{' '}
    </Link>
    </>
    );
  }

