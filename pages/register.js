/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Form, Button, Card, Alert, Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await registerUser(userName, password, password2);
      router.push("/login");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col md={6}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Register</h2> {/* Change title */}
            {error && <Alert variant="danger">{error}</Alert>}{" "}
            {/* Display error if there's any */}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="user" className="mb-2">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password" className="mb-1">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-1">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Register
              </Button>{" "}
              {/* Change button text */}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
