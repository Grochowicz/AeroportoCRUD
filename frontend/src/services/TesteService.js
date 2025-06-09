import http from "../http-common";

class ModeloDataService {
  getAll() {
    return http.get("/testes");
  }

  get(id) {
    return http.get(`/testes/${id}`);
  }

  create(data) {
    return http.post("/testes", data);
  }

  update(id, data) {
    return http.put(`/testes/${id}`, data);
  }

  delete(id) {
    return http.delete(`/testes/${id}`);
  }

  deleteAll() {
    return http.delete(`/testes`);
  }

  // findByTitle(title) {
    // return http.get(`/testes?nome=${title}`);
  // }
}

export default new ModeloDataService();