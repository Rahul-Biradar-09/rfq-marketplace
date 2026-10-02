import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuotationCard from "../../components/quotation/QuotationCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import { getRfqById } from "../../services/rfq.service";
import { getRfqQuotations } from "../../services/quotation.service";

const RfqQuotations = () => {
  const { id } = useParams();

  const [rfq, setRfq] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const [rfqResult, quotationResult] = await Promise.all([
        getRfqById(id),
        getRfqQuotations(id),
      ]);

      setRfq(rfqResult.data);
      setQuotations(quotationResult.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load quotations. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container form-page">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container form-page">
        <ErrorMessage message={error} onRetry={loadData} />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <div className="page-header">
          <Link to="/buyer/rfqs" className="back-link">
            ← Back to My RFQs
          </Link>

          <span className="eyebrow">Buyer workspace</span>

          <h1>Supplier Quotations</h1>

          {rfq && (
            <p>
              Quotations received for <strong>{rfq.productName}</strong>.
            </p>
          )}
        </div>

        {quotations.length === 0 ? (
          <EmptyState
            title="No quotations yet"
            message="Suppliers have not submitted any quotations for this RFQ yet."
          />
        ) : (
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

export default RfqQuotations;