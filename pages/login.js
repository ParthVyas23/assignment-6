"use client";
import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { authenticateUser } from "../lib/authenticate";
import { getFavourites, getHistory } from "../lib/userData";
import { favouritesAtom, searchHistoryAtom } from "../store";

function Login() {
  const router = useRouter();
  const [, setFavouriteList] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    const favourites = await getFavourites();
    setFavouriteList(favourites);
    const history = await getHistory();
    setSearchHistory(history);
  }

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const success = await authenticateUser(userName, password);
      if (success) {
        await updateAtoms();
        router.push("/favourites");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col md={6}>
        <Form onSubmit={handleSubmit} className=" col gap-5">
          <h2 className="text-center mb-4">Login</h2>
          <Form.Group controlId="username" className="mb-2">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-2">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
