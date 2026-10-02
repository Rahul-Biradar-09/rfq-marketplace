import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link
          to={
            isAuthenticated
              ? user?.role === "BUYER"
                ? "/buyer"
                : "/supplier"
              : "/login"
          }
          className="brand"
        >
          RFQ<span>Market</span>
        </Link>

        {!isAuthenticated ? (
          <nav className="nav-content">
            <div className="nav-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          </nav>
        ) : (
          <nav className="nav-content">
            <div className="nav-links">
              {user?.role === "BUYER" ? (
                <>
                  <Link to="/buyer">Dashboard</Link>
                  <Link to="/buyer/rfqs">My RFQs</Link>
                  <Link to="/buyer/rfqs/create">Create RFQ</Link>
                </>
              ) : (
                <>
                  <Link to="/supplier">Dashboard</Link>
                  <Link to="/supplier/rfqs">Browse RFQs</Link>
                  <Link to="/supplier/quotations">
                    My Quotations
                  </Link>
                </>
              )}
            </div>

            <div className="nav-user">
              <div className="user-info">
                <span className="user-name">{user.name}</span>
                <span className="user-role">{user.role}</span>
              </div>

              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;