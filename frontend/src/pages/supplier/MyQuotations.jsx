import { useEffect, useState } from "react";
import QuotationCard from "../../components/quotation/QuotationCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import { getMyQuotations } from "../../services/quotation.service";

const MyQuotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadQuotations = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getMyQuotations();
      setQuotations(result.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load your quotations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotations();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <section className="welcome-section">
          <div>
            <span className="eyebrow">Supplier workspace</span>
            <h1>My Quotations</h1>
            <p>
              Review the quotations you have submitted to buyers.
            </p>
          </div>
        </section>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={loadQuotations}
          />
        )}

        {!loading && !error && quotations.length === 0 && (
          <EmptyState
            title="No quotations yet"
            message="You haven't submitted any quotations yet. Browse active RFQs to find opportunities."
          />
        )}

        {!loading && !error && quotations.length > 0 && (
          <section className="quotation-list">
            {quotations.map((quotation) => (
              <QuotationCard
                key={quotation.id}
                quotation={quotation}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default MyQuotations;