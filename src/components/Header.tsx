import { Col, Image, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect bg="dark" expand={false} variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas
          id="responsive-navbar-nav"
          placement="start"
          bg="dark"
          className="bg-dark text-white"
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
              <Nav.Link as={Link} to="/" active={true}>
                Posts
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      <Outlet />
    </>
  );
};

export default Header;
