import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = process.env.REACT_APP_API_URL;

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data: Record<string, any> | FormData,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const isFormData = data instanceof FormData;

    const response = await this.axiosInstance.post<T>(url, data, {
      ...config,
      headers: {
        ...(isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
        ...config?.headers,
      },
    });

    return response.data;
  }
}

const api = new ApiService();
export default api;
