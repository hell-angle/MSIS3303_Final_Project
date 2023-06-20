import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { MovieSearch } from './MovieSearch'
import { MovieCreate } from './MovieCreate'
import { MovieAdmin } from './MovieAdmin'
import { MovieHome } from "./MovieHome";
import { MovieBook } from "./MovieBook";
import { MovieRegister } from "./MovieRegister"
import { MovieLogin } from "./MovieLogin"
import { Navbar, Nav, Container, Carousel } from 'react-bootstrap'
import { HOST, PORT } from './constant'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/home">Home page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/search">Find Movie</Nav.Link>
              <Nav.Link as={NavLink} to="/create">Add Movie</Nav.Link>
              <Nav.Link as={NavLink} to="/movies">Manage Movie</Nav.Link>
              <Nav.Link as={NavLink} to="/book">Book Seat</Nav.Link>
              {loggedIn ? (
                <>
                  <Nav.Link disabled>Register</Nav.Link>
                  <Nav.Link disabled>Login</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/" element={<MovieHome />} />
        <Route exact path="/home" element={<MovieHome />} />
        <Route exact path="/search" element={<MovieSearch />} />
        <Route exact path="/create" element={<MovieCreate />} />
        <Route exact path="/movies" element={<MovieAdmin />} />
        <Route exact path="/book" element={<MovieBook />} />
        <Route exact path="/register" element={<MovieRegister />} />
        <Route
          exact
          path="/login"
          element={<MovieLogin onLoginSuccess={handleLoginSuccess} />}
        />
      </Routes>
      <div className="App"></div>
    </Router>
  );
}

export default App;
