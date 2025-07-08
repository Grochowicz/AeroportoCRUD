import http from "../http-common";

class PeritoEmDataService {
  getAll() {
    return http.get("/perito_em");
  }

  get(id) {
    return http.get(`/perito_em/${id}`);
  }

  create(data) {
    return http.post("/perito_em", data);
  }

  update(id, data) {
    return http.put(`/perito_em/${id}`, data);
  }

  delete(id) {
    return http.delete(`/perito_em/${id}`);
  }

  deleteAll() {
    return http.delete(`/perito_em`);
  }

  getByTecnicoId(tecnicoId) {
    return http.get(`/perito_em?tecnicoId=${tecnicoId}`);
  }

  // findByTitle(title) {
    // return http.get(`/perito_em?nome=${title}`);
  // }
}

export default new PeritoEmDataService();