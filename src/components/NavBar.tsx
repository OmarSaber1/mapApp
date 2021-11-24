import { Navbar, Container, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../Redux/actions/auth";
import { exportJSON } from "../utils/helpers";

const NavBar = () => {
  const dispatch = useDispatch();
  const zone = useSelector((state: any) => state.zone);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/map">Maps </Navbar.Brand>
          <NavLink to="/map" onClick={() => exportJSON(zone.zones)}>
            Download Data
          </NavLink>
          <Nav className="mr-auto">
            <NavLink to="/" onClick={() => dispatch(logout())}>
              Logout
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBar;
