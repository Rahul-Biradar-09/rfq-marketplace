import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { createQuotation } from "../../services/quotation.service";

const QuotationForm = ({ rfqId }) => {
  const [form, setForm] = useState({
    quotedPrice: "",
    estimatedDeliveryTime: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
    setSuccess("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.quotedPrice || Number(form.quotedPrice) <= 0) {
      nextErrors.quotedPrice = "Quoted price must be greater than 0.";
    }

    if (!form.estimatedDeliveryTime.trim()) {
      nextErrors.estimatedDeliveryTime =
        "Estimated delivery time is required.";
    }

    if (form.estimatedDeliveryTime.trim().length > 100) {
      nextErrors.estimatedDeliveryTime =
        "Estimated delivery time must be 100 characters or less.";
    }

    if (form.message.trim().length > 1000) {
      nextErrors.message =
        "Message must be 1000 characters or less.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setServerError("");
    setSuccess("");

    if (!validate()) return;

    setLoading(true);

    try {
      await createQuotation(rfqId, {
        quotedPrice: Number(form.quotedPrice),
        estimatedDeliveryTime: form.estimatedDeliveryTime.trim(),
        message: form.message.trim(),
      });

      setForm({
        quotedPrice: "",
        estimatedDeliveryTime: "",
        message: "",
      });

      setSuccess("Quotation submitted successfully.");
    } catch (error) {
      setServerError(
        error.response?.data?.message ||
          "Unable to submit quotation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="quotation-form">
      {serverError && (
        <div className="auth-error" role="alert">
          {serverError}
        </div>
      )}

      {success && (
        <div className="success-message" role="status">
          {success}
        </div>
      )}

      <Input
        label="Quoted price"
        name="quotedPrice"
        type="number"
        value={form.quotedPrice}
        onChange={handleChange}
        placeholder="Enter your quotation amount"
        min="0"
        step="0.01"
        required
        error={errors.quotedPrice}
      />

      <Input
        label="Estimated delivery time"
        name="estimatedDeliveryTime"
        type="text"
        value={form.estimatedDeliveryTime}
        onChange={handleChange}
        placeholder="e.g. 10 days"
        required
        error={errors.estimatedDeliveryTime}
      />

      <div className="form-group">
        <label htmlFor="message">
          Message <span className="optional-label">(optional)</span>
        </label>

        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Add any relevant information for the buyer..."
          rows="5"
          maxLength="1000"
          className={errors.message ? "input-error" : ""}
        />

        {errors.message && (
          <span className="field-error">{errors.message}</span>
        )}
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Quotation"}
      </Button>
    </form>
  );
};

export default QuotationForm;