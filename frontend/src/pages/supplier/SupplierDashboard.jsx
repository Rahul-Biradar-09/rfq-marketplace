import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SupplierDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <section className="welcome-section">
          <div>
            <span className="eyebrow">Supplier workspace</span>

            <h1>Welcome back, {user?.name}</h1>

            <p>
              Discover business requirements, submit competitive quotations,
              and manage your supplier activity.
            </p>
          </div>

          <Link to="/supplier/rfqs" className="btn btn-primary">
            Browse RFQs
          </Link>
        </section>

        <section className="dashboard-grid">
          <Link
            to="/supplier/rfqs"
            className="dashboard-card"
          >
            <div className="dashboard-card-icon">RFQ</div>

            <div>
              <h2>Browse RFQs</h2>

              <p>
                Discover active business requirements from buyers and find
                opportunities that match your services.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </Link>

          <Link
            to="/supplier/quotations"
            className="dashboard-card"
          >
            <div className="dashboard-card-icon">Q</div>

            <div>
              <h2>My Quotations</h2>

              <p>
                View the quotations you have submitted and track your supplier
                activity.
              </p>
            </div>

            <span className="card-arrow">→</span>
          </Link>
        </section>

        <section className="info-banner">
          <div className="info-banner-icon">i</div>

          <div>
            <h3>How it works</h3>

            <p>
              Browse open RFQs, review the buyer's requirements, and submit
              your best quotation before the deadline.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupplierDashboard;