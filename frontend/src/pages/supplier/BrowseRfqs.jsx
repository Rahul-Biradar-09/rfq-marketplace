import { useEffect, useState } from "react";
import RfqCard from "../../components/rfq/RfqCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { getAvailableRfqs } from "../../services/rfq.service";

const BrowseRfqs = () => {
  const [rfqs, setRfqs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRfqs = async (filters = {}) => {
    setLoading(true);
    setError("");

    try {
      const result = await getAvailableRfqs(filters);
      setRfqs(result.data || []);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load RFQs. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRfqs();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const filters = {};

    if (search.trim()) {
      filters.search = search.trim();
    }

    if (location.trim()) {
      filters.location = location.trim();
    }

    loadRfqs(filters);
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    loadRfqs();
  };

  return (
    <div className="dashboard-page">
      <div className="page-container">
        <section className="welcome-section">
          <div>
            <span className="eyebrow">Supplier workspace</span>

            <h1>Browse RFQs</h1>

            <p>
              Discover active business requirements and find opportunities
              that match your services.
            </p>
          </div>
        </section>

        <form onSubmit={handleSearch} className="filter-bar">
          <Input
            label="Search"
            name="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search product or service..."
          />

          <Input
            label="Delivery location"
            name="location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="e.g. Hyderabad"
          />

          <div className="filter-actions">
            <Button type="submit" disabled={loading}>
              Search
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={clearFilters}
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        </form>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={() => loadRfqs()} />
        )}

        {!loading && !error && rfqs.length === 0 && (
          <EmptyState
            title="No RFQs found"
            message="There are currently no active RFQs matching your search."
          />
        )}

        {!loading && !error && rfqs.length > 0 && (
          <>
            <div className="results-header">
              <strong>{rfqs.length}</strong>{" "}
              {rfqs.length === 1 ? "RFQ" : "RFQs"} available
            </div>

            <section className="rfq-list">
              {rfqs.map((rfq) => (
                <RfqCard key={rfq.id} rfq={rfq} />
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default BrowseRfqs;