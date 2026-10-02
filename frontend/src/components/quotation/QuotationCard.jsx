const QuotationCard = ({ quotation }) => {
  const price = Number(quotation.quotedPrice);

  return (
    <article className="quotation-card">
      <div className="quotation-card-header">
        <div>
          <span className="eyebrow">Supplier quotation</span>
          <h3>
            {quotation.supplier?.name || "Supplier"}
          </h3>
          {quotation.supplier?.email && (
            <p>{quotation.supplier.email}</p>
          )}
        </div>

        <div className="quotation-price">
          <span>Quoted Price</span>
          <strong>
            ₹{price.toLocaleString("en-IN")}
          </strong>
        </div>
      </div>

      <div className="quotation-meta">
        <div>
          <span className="meta-label">Estimated delivery</span>
          <strong>
            {quotation.estimatedDeliveryTime}
          </strong>
        </div>

        <div>
          <span className="meta-label">Submitted</span>
          <strong>
            {new Date(quotation.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </strong>
        </div>
      </div>

      {quotation.message && (
        <div className="quotation-message">
          <span className="meta-label">Supplier message</span>
          <p>{quotation.message}</p>
        </div>
      )}
    </article>
  );
};

export default QuotationCard;