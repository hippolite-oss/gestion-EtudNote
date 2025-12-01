// src/pages/Login.jsx
/*import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Connexion Admin</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}*/

import React, {useState} from 'react';
import { Button, Col, Row, Container, Form, FloatingLabel, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';

function Login(){

 
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Prototype : email/mdp fixes
    if (email === "hippoliteagbodamakou@gmail.com" && password === "1234") {
      navigate("/dashboard");
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };


    return (
      <Container
        fluid
        className="vh-100 d-flex align-items-center justify-content-center bg-light p-0 m-0"
      >
        <Row className="w-100 h-100 shadow-lg rounded overflow-hidden bg-white">
          <Col
            md={6}
            className="d-none d-md-flex flex-column justify-content-center align-items-center bg-dark text-white p-5 h-100"
          >
            <h2>Gestion Notes</h2>
            <p>Pour commencer, connecter-vous à votre compte</p>
          </Col>

          <Col md={6} className="d-flex flex-column justify-content-center align-items-center p-5 h-100">
           {/*<div className="mb-4 text-end">
              <small>Vous n'avez pas de compte ? </small>
              <Link to="/register" className="ms-2">
                <Button 
                  variant="outline-success" 
                  size="sm"
                >
                  S'inscrire
                </Button>
              </Link>
            </div>*/}
            <Form onSubmit={handleLogin} className="w-100">
              <FloatingLabel label="Email" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FloatingLabel>
              {error && (
                <Alert variant="danger" className="mt-3">
                  {error}
                </Alert>
              )}
              <FloatingLabel label="Mot de passe" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
              </FloatingLabel>
              {error && (
                <div style={{ color: 'red', marginBottom: 10 }}>{error}</div>
              )}
              <Button variant="success" type="submit" className="w-100 mt-3">
                Se Connecter
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
};
export default Login;






