import { BASE_URL } from "@/utils/config";
import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

class ApiClientBase {
  protected instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL,
      timeout: 50000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private attachToken = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const tokenParse = JSON.parse(localStorage.getItem("UBMTToken")!);
    const token = tokenParse?.access_token;
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosHeaders;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  private handleRequestError = (error: any) => {
    return Promise.reject(error);
  };
  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.attachToken, this.handleRequestError);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = (res: AxiosResponse) => {
    if (
      res.data?.message == "Phiên đăng nhập của bạn đã hết hạn" ||
      res.data?.message == "Vui lòng đăng nhập để sử dụng tính năng này"
    ) {
      localStorage.removeItem("UBMTToken");
      window.location.href = "/client/login";
    }

    return res.data;
  };

  protected handleError = (err: any) => {
    console.log("interceptor error", err);
    if (err?.response) {
      if (err?.response?.status == 401) {
        localStorage.removeItem("UBMTToken");
        window.location.href = "client/login";
      }
    }
    return Promise.reject(err);
  };

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

export default ApiClientBase;
