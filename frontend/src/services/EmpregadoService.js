import http from "../http-common";

class EmpregadoDataService {
  getAll() {
    return http.get("/empregados");
  }

  get(id) {
    return http.get(`/empregados/${id}`);
  }

  create(data) {
    return http.post("/empregados", data);
  }

  createControlador(data) {
    return http.post("/controladores", data);
  }

  createTecnico(data) {
    return http.post("/tecnicos", data);
  }

  update(id, data) {
    return http.put(`/empregados/${id}`, data);
  }

  delete(id) {
    return http.delete(`/empregados/${id}`);
  }

  deleteAll() {
    return http.delete(`/empregados`);
  }

  findByNome(nome) {
    return http.get(`/empregados?nome=${nome}`);
  }
}

export default new EmpregadoDataService();