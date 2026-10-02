import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RfqForm from "../../components/rfq/RfqForm";
import { createRfq } from "../../services/rfq.service";

const CreateRfq = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (rfqData) => {
    setServerError("");
    setLoading(true);

    try {
      await createRfq(rfqData);
      navigate("/buyer/rfqs", { replace: true });
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to create RFQ. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container form-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Buyer workspace</span>
          <h1>Create RFQ</h1>
          <p>
            Share your business requirement and let suppliers submit
            competitive quotations.
          </p>
        </div>
      </div>

      <RfqForm
        onSubmit={handleSubmit}
        loading={loading}
        submitLabel="Create RFQ"
        serverError={serverError}
      />
    </div>
  );
};

export default CreateRfq;