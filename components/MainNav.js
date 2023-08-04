import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { searchHistoryAtom, isAuthenticatedAtom } from "@/store";
import { useAtom } from "jotai";

import { addToHistory } from "../lib/userData";
import { removeToken } from "../lib/authenticate";

import { authToken } from "@/store";

export default function MainNav() {
  const { register, handleSubmit } = useForm();

  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const [token, setToken] = useAtom(authToken);

  async function submitForm(data) {
    setIsExpanded(false);
    let query = "title=true";
    if (data.q) {
      query += "&q=" + data.q;
    }

    setSearchHistory(await addToHistory(path));

    router.push(`/artwork?${query}`);
  }

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <>
      <Navbar
        expanded={isExpanded}
        expand="lg"
        className="fixed-top navbar-dark bg-secondary "
      >
        <Container>
          <Navbar.Brand>Parth Vyas</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  active={router.pathname === "/"}
                  onClick={() => setIsExpanded(false)}
                >
                  Home
                </Nav.Link>
              </Link>
              {isAuthenticated && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/search"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {isAuthenticated && (
              <Form onSubmit={handleSubmit(submitForm)} className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Title"
                  className="me-2"
                  aria-label="Title"
                  name="q"
                  {...register("q")}
                />
                <Button onClick={handleSubmit(submitForm)} variant="success">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            {isAuthenticated && (
              <NavDropdown title={token?.userName} id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/favourites"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item
                    active={router.pathname === "/history"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
            {!isAuthenticated && (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/register"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Register
                  </Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    active={router.pathname === "/login"}
                    onClick={() => setIsExpanded(false)}
                  >
                    Login
                  </Nav.Link>
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
