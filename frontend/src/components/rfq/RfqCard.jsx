import { Link } from "react-router-dom";

const RfqCard = ({ rfq, buyerView = false, onDelete }) => {
  const deadline = new Date(rfq.deadline);

  const isExpired = deadline <= new Date();

  return (
    <article className="rfq-card">
      <div className="rfq-card-top">
        <div>
          <span className={`status-badge ${isExpired ? "expired" : "active"}`}>
            {isExpired ? "Expired" : "Open"}
          </span>

          <h3 className="rfq-title">{rfq.productName}</h3>
        </div>

        <div className="rfq-quantity">
          <span>Quantity</span>
          <strong>{rfq.quantity.toLocaleString()}</strong>
        </div>
      </div>

      <p className="rfq-description">{rfq.description}</p>

      <div className="rfq-meta">
        <div>
          <span className="meta-label">Delivery location</span>
          <strong>{rfq.deliveryLocation}</strong>
        </div>

        <div>
          <span className="meta-label">Deadline</span>
          <strong>
            {deadline.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </strong>
        </div>
      </div>

      <div className="rfq-card-actions">
        {buyerView ? (
          <>
            <Link
              to={`/buyer/rfqs/${rfq.id}/quotations`}
              className="btn btn-primary"
            >
              View Quotations
            </Link>

            <Link
              to={`/buyer/rfqs/${rfq.id}/edit`}
              className="btn btn-secondary"
            >
              Edit
            </Link>

            {onDelete && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(rfq.id)}
              >
                Delete
              </button>
            )}
          </>
        ) : (
          <Link
            to={`/supplier/rfqs/${rfq.id}`}
            className="btn btn-primary"
          >
            View Details
          </Link>
        )}
      </div>
    </article>
  );
};

export default RfqCard;