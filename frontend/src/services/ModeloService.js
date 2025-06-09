import http from "../http-common";

class ModeloDataService {
  getAll() {
    return http.get("/modelos");
  }

  get(id) {
    return http.get(`/modelos/${id}`);
  }

  create(data) {
    return http.post("/modelos", data);
  }

  update(id, data) {
    return http.put(`/modelos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/modelos/${id}`);
  }

  deleteAll() {
    return http.delete(`/modelos`);
  }

  findByTitle(title) {
    return http.get(`/modelos?nome=${title}`);
  }
}

export default new ModeloDataService();