import { toast } from "react-toastify";
import ApiClientBase from "../ApiClientBase";

interface BaseResponse {
  message: string;
  status: string;
}

class ApiProduct extends ApiClientBase {
  constructor() {
    super();
  }

  /**
   * getProduct
   */

  public async allProduct(access_token: string): Promise<BaseResponse | any> {
    const res = await this.instance.get(`/api/products/get-all`, {});
    return res.data;
  }

  public async uploadProduct(productData: FormData): Promise<BaseResponse | any> {
    const res = await this.instance.post(`/api/common/upload-images?type=1`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  public async uploadImageBase64(imageData: any): Promise<BaseResponse | any> {
    const res = await this.instance.post(`/api/common/upload-images-base64`, imageData, {});
    return res.data;
  }

  public async postNews(access_token: string, productData: FormData): Promise<BaseResponse | any> {
    const res = await this.instance.post(`/api/posts/add`, productData, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }
  public async buyHistory(access_token: string): Promise<BaseResponse | any> {
    const res = await this.instance.get(`/api/products/buy-history`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }

  public async downloadProduct(access_token: string, productid: string): Promise<BaseResponse | any> {
    const res = await this.instance.get(`/api/products/download?transaction=${productid}`, {
      headers: {
        Authorization: "Bearer " + access_token,
      },
    });
    return res.data;
  }

  public async buyProduct(access_token: string, product_id: number, total: number): Promise<BaseResponse | any> {
    const res = await this.instance.post(
      `/api/products/buy`,
      {
        product_id: product_id,
        total: total,
      },
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    );
    return res;
  }
}

export default ApiProduct;
