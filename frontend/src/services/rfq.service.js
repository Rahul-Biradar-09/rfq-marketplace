import api from "./api";

export const createRfq = async (rfqData) => {
  const response = await api.post("/rfqs", rfqData);

  return response.data;
};

export const getMyRfqs = async () => {
  const response = await api.get("/rfqs/my");

  return response.data;
};

export const getAvailableRfqs = async (filters = {}) => {
  const response = await api.get("/rfqs", {
    params: filters,
  });

  return response.data;
};

export const getRfqById = async (rfqId) => {
  const response = await api.get(`/rfqs/${rfqId}`);

  return response.data;
};

export const updateRfq = async (rfqId, rfqData) => {
  const response = await api.put(`/rfqs/${rfqId}`, rfqData);

  return response.data;
};

export const deleteRfq = async (rfqId) => {
  const response = await api.delete(`/rfqs/${rfqId}`);

  return response.data;
};