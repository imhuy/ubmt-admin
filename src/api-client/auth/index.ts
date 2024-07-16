import { AxiosResponse } from "axios";
import ApiClientBase from "../ApiClientBase";
import { AccountDetailResponse, LoginParamsType, LoginResponseType, RegisterParamsType } from "../types/AuthType";
import { AnyARecord } from "dns";

class ApiAuth extends ApiClientBase {
  constructor() {
    super();
    this.instance.defaults.headers["Content-Type"] = "application/json";
  }

  /**
   * Login
   */
  public async login(params: LoginParamsType): Promise<LoginResponseType | any> {
    const res = await this.instance.post("/api/auth/login", params);
    return res;
  }

  /**
   * sign up
   */
  public async signUp(params: RegisterParamsType): Promise<any> {
    const res = await this.instance.post("/api/auth/register", params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res;
  }

  /**
   * confirm email
   */
  public async confirmEmail(token: string, access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/confirm-email",
      {
        token: token.replaceAll(" ", "+"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async verifyEmail(access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/account-extend/verify-email",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async canCancel(access_token: string): Promise<any> {
    const res = await this.instance.post(
      "/api/app/payment/can-cancel",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async getAccountExtendDetails(access_token: string): Promise<AccountDetailResponse> {
    const res = await this.instance.get("/api/user/", {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }

  public async upDateUserInfo(access_token: string, formData: any): Promise<AccountDetailResponse> {
    const res = await this.instance.post("/api/user/", formData, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }

  public async createUser(formData: any): Promise<any> {
    const res = await this.instance.post("/api/user/add", formData, {
      headers: {},
    });
    return res;
  }

  public async listDelegateUser(): Promise<any> {
    const res = await this.instance.get("/api/delegate/get-all", {});
    return res.data;
  }

  public async listNews(): Promise<any> {
    const res = await this.instance.get("api/posts/get-all?cat_id=1&skip=0&take=1000", {});
    return res.data;
  }

  public async deletePostById(id: number): Promise<any> {
    const res = await this.instance.delete(`/api/posts/delete/${id}`, {
      headers: {},
    });
    return res.data;
  }

  public async deleteDelegationById(id: number): Promise<any> {
    const res = await this.instance.delete(`/api/delegate/delete/${id}`, {
      headers: {},
    });
    return res.data;
  }
  public async listDelegate(): Promise<any> {
    const res = await this.instance.get("/api/delegate/list", {});
    return res.data;
  }

  public async addDelegation(name: string): Promise<any> {
    const res = await this.instance.post("/api/delegate/add", { name: name });
    return res.data;
  }

  public async changePassword(access_token: string, currentPassword: string, newPassword: string): Promise<any> {
    const res = await this.instance.post(
      `/api/app/account-extend/change-password?currentPassword=${currentPassword}&newPassword=${newPassword}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res.data;
  }

  public async resetPassword(email: string): Promise<any> {
    const res = await this.instance.post(`/api/app/account-extend/reset-password?email=${email}`, {});
    return res.data;
  }

  public async confirmResetPassword(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): Promise<any> {
    const tokenFormat = token.replaceAll(" ", "+");
    const res = await this.instance.post(
      `/api/app/account-extend/confirm-reset-password`,
      {
        email,
        token: tokenFormat,
        password,
        confirmPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
}

export default ApiAuth;
