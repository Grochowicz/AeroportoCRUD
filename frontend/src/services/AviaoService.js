import http from "../http-common";

class AviaoDataService {
  getAll() {
    return http.get("/avioes");
  }

  get(id) {
    return http.get(`/avioes/${id}`);
  }

  create(data) {
    return http.post("/avioes", data);
  }

  update(id, data) {
    return http.put(`/avioes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/avioes/${id}`);
  }

  deleteAll() {
    return http.delete(`/avioes`);
  }

  findByModelo(modelo) {
    return http.get(`/avioes?modeloId=${modelo}`);
  }
}

export default new AviaoDataService();