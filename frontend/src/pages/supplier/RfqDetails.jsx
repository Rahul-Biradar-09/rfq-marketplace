import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuotationForm from "../../components/quotation/QuotationForm";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import { getRfqById } from "../../services/rfq.service";

const RfqDetails = () => {
  const { id } = useParams();

  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRfq = async () => {
      try {
        const result = await getRfqById(id);
        setRfq(result.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Unable to load this RFQ. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadRfq();
  }, [id]);

  if (loading) {
    return (
      <div className="page-container form-page">
        <Loading />
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="page-container form-page">
        <ErrorMessage message={error || "RFQ not found."} />
      </div>
    );
  }

  const deadline = new Date(rfq.deadline);
  const isExpired = deadline <= new Date();

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <Link to="/supplier/rfqs" className="back-link">
          ← Back to Browse RFQs
        </Link>

        <section className="page-header">
          <span className="eyebrow">Supplier workspace</span>
          <h1>{rfq.productName}</h1>
          <p>Review the buyer's requirement and submit your quotation.</p>
        </section>

        <article className="rfq-details-card">
          <div className="rfq-details-top">
            <div>
              <span className={`status-badge ${isExpired ? "expired" : "active"}`}>
                {isExpired ? "Expired" : "Open"}
              </span>

              <h2>{rfq.productName}</h2>
            </div>

            <div className="rfq-detail-quantity">
              <span>Quantity</span>
              <strong>{rfq.quantity.toLocaleString()}</strong>
            </div>
          </div>

          <div className="rfq-detail-description">
            <span className="meta-label">Description</span>
            <p>{rfq.description}</p>
          </div>

          <div className="rfq-meta">
            <div>
              <span className="meta-label">Delivery location</span>
              <strong>{rfq.deliveryLocation}</strong>
            </div>

            <div>
              <span className="meta-label">Quotation deadline</span>
              <strong>
                {deadline.toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </div>
          </div>
        </article>

        {!isExpired && (
          <section className="quotation-section">
            <div className="page-header">
              <span className="eyebrow">Submit proposal</span>
              <h2>Submit Your Quotation</h2>
              <p>
                Provide your price, estimated delivery time, and a message for
                the buyer.
              </p>
            </div>

            <QuotationForm rfqId={id} />
          </section>
        )}
      </div>
    </div>
  );
};

export default RfqDetails;