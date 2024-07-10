import ApiAuth from "./auth";
import ApiPayment from "./payment";
import ApiProduct from "./product";

export const authApi = new ApiAuth();
export const paymentApi = new ApiPayment();
export const productApi = new ApiProduct();
