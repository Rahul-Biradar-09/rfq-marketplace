import api from "./api";

export const createQuotation = async (rfqId, quotationData) => {
  const response = await api.post(
    `/rfqs/${rfqId}/quotations`,
    quotationData
  );

  return response.data;
};

export const getMyQuotations = async () => {
  const response = await api.get("/quotations/my");

  return response.data;
};

export const getRfqQuotations = async (rfqId) => {
  const response = await api.get(`/rfqs/${rfqId}/quotations`);

  return response.data;
};