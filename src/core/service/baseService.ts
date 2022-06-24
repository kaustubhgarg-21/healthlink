// Package Imports
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { clearLocalStorage, getAccessToken, getIdToken, getIPAddress, getLastActivity, getRefreshToken } from "../../utility/appUtil";
import { message } from "antd";
import { PortalModule } from "../../environment/apiEnvironment";
import { getAPIBaseUrl } from "../../environment/api";
import jwtDecode from "jwt-decode";
import moment from "moment";
import { LocalStorageKeys } from "../../web/constants/enums";
import dotenv from 'dotenv'

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
  BadRequest = 400
}

const headers: Readonly<Record<string, string>> = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "X-Requested-With": "XMLHttpRequest",
};
enum ErrorMessage {
  InvalidPassword = "Invalid password",
  TokenExpired = "TokenExpiredError",
  TokenRequired = "Token Required",
  InvalidToken = "JsonWebTokenError"
}
const injectAccessToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
 
  try {
    const token = getAccessToken();
    if (config.headers === undefined) {
      config.headers = {};
    }
    if (token != null) {
      config.headers[LocalStorageKeys.ACC_TOKEN] = token;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

const injectIP = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const ipAdd = getIPAddress();
    if (config.headers === undefined) {
      config.headers = {};
    }    if (ipAdd != null) {
      config.headers['ip'] = ipAdd;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};
const injectIdToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const idToken = getIdToken();
    if (config.headers === undefined) {
      config.headers = {};
    }    if (idToken != null) {
      config.headers[LocalStorageKeys.ID_TOKEN] = idToken;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

const injectRefreshToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const refreshToken = getRefreshToken();
    if (config.headers === undefined) {
      config.headers = {};
    }    if (refreshToken != null) {
      config.headers[LocalStorageKeys.REF_TOKEN] = refreshToken;
    }
    return config;
  } catch (error: any) {
    throw new Error(error);
  }
};

const storeRequestTime  = (config: AxiosRequestConfig):AxiosRequestConfig => {
  var x = process.env.REACT_APP_REFRESH_TIME|| "35"
  var currentTime = moment().format("X")
  const accTok = getAccessToken() 
  const refreshReq = {
    refreshToken: getRefreshToken(),
    userId : localStorage.getItem(LocalStorageKeys.USER_ID)
  }
  var decodedToken :any
  try {
    if(accTok){
      decodedToken =  jwtDecode(accTok)
    }
    if((decodedToken?.exp - parseInt(currentTime))/60 <= parseInt(x)){
      axios.post(getAPIBaseUrl(PortalModule.LOGIN)+`restToken`,refreshReq)
      .then(({data})=>{
        console.log("While refreshing Acess token Recieved Data >>>>>>>>>>>>>", data)
        const {result} = data
        localStorage.setItem(LocalStorageKeys.ACC_TOKEN, result['accessToken'])
        localStorage.setItem(LocalStorageKeys.ID_TOKEN, result['idToken'])
        localStorage.setItem(LocalStorageKeys.REF_TOKEN, result['refreshToken'])
        // console.log(data, '12344555 data reset')
      })
      .catch((e)=>console.log("error in updating token", e))
    }
  return config 
  } catch (error: any) {
    throw new Error(error);
  }
}
export default abstract class BaseService {
  constructor(private baseURL: string) {
  }

  private instance: AxiosInstance | null = null;

  protected async request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.request(config);
  }

  protected async get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.get<T, R>(url, config);
  }

  protected async post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.post<T, R>(url, data, config);
  }

  protected async put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.put<T, R>(url, data, config);
  }

  protected async patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.patch<T, R>(url, data, config);
  }

  protected async delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return await this.http.delete<T, R>(url, config);
  }

  private get http(): AxiosInstance {
    return this.instance != null ? this.instance : this.initHttp();
  }

  private initHttp(): AxiosInstance {
    const http = axios.create({
      baseURL: this.baseURL,
      headers,
       withCredentials: false,
    });

    //use id token
    http.interceptors.request.use(injectIdToken, (error) =>
      Promise.reject(error)
    );

    // use access token
    http.interceptors.request.use(injectAccessToken, (error) =>
      Promise.reject(error)
    );

    //use refresh token
    http.interceptors.request.use(injectRefreshToken, (error) =>
      Promise.reject(error)
    );

    //inject IP address
    http.interceptors.request.use(injectIP, (error) =>
    Promise.reject(error)
  );

  //for refreshtoken update
  http.interceptors.request.use(storeRequestTime, (error) =>
  Promise.reject(error)
);

    //handl errors
    http.interceptors.response.use(
      (response) => response,
      (error) => {
        const { response } = error;
        return this.handleError(response);
      }
    );
    this.instance = http;
    return http;
  }

  private handleError (error: any) {
    const status = error?.status;
    switch (status) {
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        if(error?.data?.error?.message === ErrorMessage.InvalidPassword){
          return error;
        }else{
          return error
        }
        // console.log("Token Expired clearing local storage >>>>>>>>")    
        // // storage.removeItem('@@appStateStores/STATE')
        // message.warning("Session expired please login again to continue.")
        // this.post(getAPIBaseUrl(PortalModule.LOGIN)+"/logout").then(()=>{
        //   clearLocalStorage().then(()=> window.location.href = '/login').catch((e:any)=>console.log("error: " ,e))
        // })
        // break;
      }case StatusCode.InternalServerError: {
        if(error?.data?.error?.message?.name === ErrorMessage.TokenExpired){
          console.log("Token Expired clearing local storage >>>>>>>>")  
          // storage.removeItem('@@appStateStores/STATE')       
          this.post(getAPIBaseUrl(PortalModule.LOGIN)+"/logout").then(()=>{
            clearLocalStorage().then(()=> window.location.href = '/login').catch((e:any)=>console.log("error: " ,e))
          })
          break
        }else if(error?.data?.error?.message?.name === ErrorMessage.InvalidToken){
          console.log("Token Expired clearing local storage >>>>>>>>")
         
          message.warning("Session expired please login again to continue.")
          this.post(getAPIBaseUrl(PortalModule.LOGIN)+"/logout").then(()=>{
            clearLocalStorage().then(()=> window.location.href = '/login').catch((e:any)=>console.log("error: " ,e))
          })
          break
        }
        else{
          return error
        }
      }case StatusCode.BadRequest: {
        if(error?.data?.error?.message === ErrorMessage.TokenRequired){
          console.log("Token Expired clearing local storage >>>>>>>>")
          // storage.removeItem('@@appStateStores/STATE')
          this.post(getAPIBaseUrl(PortalModule.LOGIN)+"/logout").then(()=>{
            clearLocalStorage().then(()=> window.location.href = '/login').catch((e:any)=>console.log("error: " ,e))
          })
          break
        }else{
          return error
        }
      }
      default: {
        return error;
      }
    }

    return Promise.reject(error);
  }
}
