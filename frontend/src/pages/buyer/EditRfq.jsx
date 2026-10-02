import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RfqForm from "../../components/rfq/RfqForm";
import Loading from "../../components/common/Loading";
import { getRfqById, updateRfq } from "../../services/rfq.service";

const EditRfq = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [rfq, setRfq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (rfqData) => {
    setError("");
    setSaving(true);

    try {
      await updateRfq(id, rfqData);
      navigate("/buyer/rfqs", { replace: true });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update RFQ. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container form-page">
        <Loading />
      </div>
    );
  }

  if (error && !rfq) {
    return (
      <div className="page-container form-page">
        <div className="auth-error" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container form-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">Buyer workspace</span>
          <h1>Edit RFQ</h1>
          <p>Update the details of your business requirement.</p>
        </div>
      </div>

      <RfqForm
        initialData={rfq}
        onSubmit={handleSubmit}
        loading={saving}
        submitLabel="Save Changes"
        serverError={error}
      />
    </div>
  );
};

export default EditRfq;