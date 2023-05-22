import { useState } from "react";
import { Col, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        className="border-bottom sticky-top"
        collapseOnSelect
        bg="dark"
        expand={false}
        variant="dark"
      >
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={handleShow}
        />
        <Navbar.Offcanvas
          id="responsive-navbar-nav"
          placement="start"
          bg="dark"
          className="bg-dark text-white"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header className="align-items-start">
            <Image
              src="https://cdn.7tv.app/emote/6306876cbe8c19d70f9d6b22/4x.webp"
              width={128}
              height={128}
              roundedCircle
            />
            <Col className="ms-5">
              <Offcanvas.Title>Name</Offcanvas.Title>
              <Offcanvas.Title>Email</Offcanvas.Title>
            </Col>
          </Offcanvas.Header>
          <Offcanvas.Body className="border-top">
            <Nav>
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={handleClose}>
                About
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      <Col className="bg-dark text-white">
        <Outlet />
      </Col>
    </>
  );
};

export default Header;
