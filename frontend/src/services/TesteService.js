import http from "../http-common";

class TesteDataService{
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

  findByNumAnac(num) {
     return http.get(`/testes?num_anac=${num}`);
  }
}

export default new TesteDataService();