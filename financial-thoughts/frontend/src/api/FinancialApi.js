import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

class FinancialApi {

  static token;

  static async request(endpoint, data = {}, method = "get") {

    const url = `${BASE_URL}/${endpoint}`;

    const headers = {};

    if (FinancialApi.token) {
      headers.Authorization = `Bearer ${FinancialApi.token}`;
    }

    const params =
      method === "get"
        ? data
        : {};

    const response = await axios({
      url,
      method,
      data,
      params,
      headers
    });

    return response.data;
  }

static async login(data) {
  const res = await this.request("auth/login", data, "post");

  FinancialApi.token = res.token;
  localStorage.setItem("token", res.token);

  return res.token;
}

static async register(data) {
  const res = await this.request(
    "auth/register",
    data,
    "post"
  );

  FinancialApi.token = res.token;
  localStorage.setItem("token", res.token);

  return res.token;
}

  static async getTransactions() {
    return await this.request(
      "transactions"
    );
  }

  static async getSummary() {
    return await this.request(
      "transactions/summary"
    );
  }
  
  static async createTransaction(data) {
  return await this.request(
    "transactions",
    data,
    "post"
    );
  }

  static async updateTransaction(id, data) {

  return await this.request(
    `transactions/${id}`,
    data,
    "put"
    );
  }

  static async deleteTransaction(id) {
  return await this.request(
    `transactions/${id}`,
    null,
    "delete"
    );
  }

static async getTransactionHistory() {
  return await this.request("transactions/history");
}

static async getReminders() {
  return await this.request("reminders");
}

static async createReminder(data) {
  return await this.request(
    "reminders",
    data,
    "post"
  );
}

static async updateReminder(id, data) {
  return await this.request(
    `reminders/${id}`,
    data,
    "put"
  );
}

static async deleteReminder(id) {
  return await this.request(
    `reminders/${id}`,
    null,
    "delete"
  );
}

}

FinancialApi.token = localStorage.getItem("token");

export default FinancialApi;