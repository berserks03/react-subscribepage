import http from "../http-common";

const getAll = (params) => {
  return http.get("/providers", { params });
};

const create = data => {
  return http.post("/providers", data);
};

const get = id => {
  return http.get(`/providers/${id}`);
};

const update = (id, data) => {
  return http.put(`/providers/${id}`, data);
};

const remove = id => {
  return http.delete(`/providers/${id}`);
};

const removeAll = () => {
  return http.delete(`/providers`);
};

const ProviderDataService = {
  getAll,
  create,
  get,
  update,
  remove,
  removeAll,
};

export default ProviderDataService;
