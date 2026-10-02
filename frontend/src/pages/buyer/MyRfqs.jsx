import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RfqCard from "../../components/rfq/RfqCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import { getMyRfqs, deleteRfq } from "../../services/rfq.service";

const MyRfqs = () => {
  const [rfqs, setRfqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRfqs = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getMyRfqs();
      setRfqs(result.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load your RFQs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRfqs();
  }, []);

  const handleDelete = async (rfqId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this RFQ?"
    );

    if (!confirmed) return;

    try {
      await deleteRfq(rfqId);
      setRfqs((currentRfqs) =>
        currentRfqs.filter((rfq) => rfq.id !== rfqId)
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to delete the RFQ. Please try again."
      );
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <section className="welcome-section">
          <div>
            <span className="eyebrow">Buyer workspace</span>
            <h1>My RFQs</h1>
            <p>
              Manage the business requirements you have posted and review
              supplier quotations.
            </p>
          </div>

          <Link to="/buyer/rfqs/create" className="btn btn-primary">
            + Create RFQ
          </Link>
        </section>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={loadRfqs} />
        )}

        {!loading && !error && rfqs.length === 0 && (
          <EmptyState
            title="No RFQs yet"
            message="Create your first business requirement to start receiving supplier quotations."
            action={
              <Link to="/buyer/rfqs/create" className="btn btn-primary">
                Create your first RFQ
              </Link>
            }
          />
        )}

        {!loading && !error && rfqs.length > 0 && (
          <section className="rfq-list">
            {rfqs.map((rfq) => (
              <RfqCard
                key={rfq.id}
                rfq={rfq}
                buyerView
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyRfqs;