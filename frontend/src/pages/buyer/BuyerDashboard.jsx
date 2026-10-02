import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const BuyerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <section className="welcome-section">
          <div>
            <span className="eyebrow">Buyer workspace</span>
            <h1>Welcome back, {user?.name}</h1>
            <p>
              Manage your business requirements and review supplier
              quotations from one place.
            </p>
          </div>

          <Link to="/buyer/rfqs/create" className="btn btn-primary">
            + Create RFQ
          </Link>
        </section>

        <section className="dashboard-grid">
          <Link to="/buyer/rfqs" className="dashboard-card">
            <div className="dashboard-card-icon">RFQ</div>
            <div>
              <h2>My RFQs</h2>
              <p>
                View, edit and manage the requirements you have posted.
              </p>
            </div>
            <span className="card-arrow">→</span>
          </Link>

          <Link to="/buyer/rfqs/create" className="dashboard-card">
            <div className="dashboard-card-icon">+</div>
            <div>
              <h2>Create a requirement</h2>
              <p>
                Post a new business requirement for suppliers to quote.
              </p>
            </div>
            <span className="card-arrow">→</span>
          </Link>
        </section>

        <section className="info-banner">
          <div className="info-banner-icon">i</div>
          <div>
            <h3>How RFQ Market works</h3>
            <p>
              Post your requirement with quantity, location and deadline.
              Suppliers can then discover your RFQ and submit quotations.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuyerDashboard;