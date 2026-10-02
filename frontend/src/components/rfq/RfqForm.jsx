import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const getInitialForm = (rfq) => {
  if (!rfq) {
    return {
      productName: "",
      description: "",
      quantity: "",
      deliveryLocation: "",
      deadline: "",
    };
  }

  const deadline = new Date(rfq.deadline);

  const localDeadline = new Date(
    deadline.getTime() - deadline.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  return {
    productName: rfq.productName || "",
    description: rfq.description || "",
    quantity: rfq.quantity?.toString() || "",
    deliveryLocation: rfq.deliveryLocation || "",
    deadline: localDeadline,
  };
};

const RfqForm = ({
  initialData,
  onSubmit,
  loading = false,
  submitLabel = "Create RFQ",
  serverError = "",
}) => {
  const [form, setForm] = useState(getInitialForm(initialData));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setForm(getInitialForm(initialData));
  }, [initialData]);

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
  };

  const validate = () => {
    const nextErrors = {};

    if (form.productName.trim().length < 2) {
      nextErrors.productName =
        "Product/service name must be at least 2 characters.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!form.quantity || Number(form.quantity) <= 0) {
      nextErrors.quantity = "Quantity must be greater than 0.";
    }

    if (!form.deliveryLocation.trim()) {
      nextErrors.deliveryLocation = "Delivery location is required.";
    }

    if (!form.deadline) {
      nextErrors.deadline = "Deadline is required.";
    } else if (new Date(form.deadline) <= new Date()) {
      nextErrors.deadline = "Deadline must be in the future.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit({
      productName: form.productName.trim(),
      description: form.description.trim(),
      quantity: Number(form.quantity),
      deliveryLocation: form.deliveryLocation.trim(),
      deadline: new Date(form.deadline).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="rfq-form">
      {serverError && (
        <div className="auth-error" role="alert">
          {serverError}
        </div>
      )}

      <Input
        label="Product / service name"
        name="productName"
        value={form.productName}
        onChange={handleChange}
        placeholder="e.g. Industrial Safety Helmets"
        required
        error={errors.productName}
      />

      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Requirement description
          <span className="required-mark">*</span>
        </label>

        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what you need, specifications, quality requirements, etc."
          className={`form-input ${
            errors.description ? "input-error" : ""
          }`}
          rows="5"
        />

        {errors.description && (
          <p className="field-error">{errors.description}</p>
        )}
      </div>

      <Input
        label="Quantity"
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        placeholder="e.g. 500"
        min="1"
        step="1"
        required
        error={errors.quantity}
      />

      <Input
        label="Delivery location"
        name="deliveryLocation"
        value={form.deliveryLocation}
        onChange={handleChange}
        placeholder="e.g. Hyderabad, Telangana"
        required
        error={errors.deliveryLocation}
      />

      <Input
        label="RFQ deadline"
        name="deadline"
        type="datetime-local"
        value={form.deadline}
        onChange={handleChange}
        required
        error={errors.deadline}
      />

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
};

export default RfqForm;