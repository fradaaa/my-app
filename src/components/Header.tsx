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
          className="ms-2"
          aria-controls="responsive-navbar-nav"
          onClick={handleShow}
        />
        <Navbar.Offcanvas
          id="responsive-navbar-nav"
          placement="start"
          bg="dark"
          className="bg-dark text-white border-end"
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
            <Col className="ms-4">
              <Offcanvas.Title>Ruslan</Offcanvas.Title>
              <Offcanvas.Title>fradasec@gmail.com</Offcanvas.Title>
            </Col>
          </Offcanvas.Header>
          <Offcanvas.Body className="border-top">
            <Nav>
              <Nav.Link className="fs-4" as={Link} to="/" onClick={handleClose}>
                Posts
              </Nav.Link>
              <Nav.Link
                className="fs-4"
                as={Link}
                to="/about"
                onClick={handleClose}
              >
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
