import http from "../http-common";

class OrderDataService {
    getAll() {
        return http.get("/orders");
    }
    create(data) {
        return http.post("/orders", data);
    }
}

export default new OrderDataService();