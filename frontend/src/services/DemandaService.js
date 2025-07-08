import http from "../http-common";

class DemandaDataService {
  getAll() {
    return http.get("/demandas");
  }

  get(id) {
    return http.get(`/demandas/${id}`);
  }

  create(data) {
    return http.post("/demandas", data);
  }

  update(id, data) {
    return http.put(`/demandas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/demandas/${id}`);
  }

  deleteAll() {
    return http.delete(`/demandas`);
  }

  findByDestino(destino) {
    return http.get(`/demandas?destino=${destino}`);
  }
}

export default new DemandaDataService();