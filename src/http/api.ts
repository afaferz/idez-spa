import axios, { type AxiosInstance } from "axios"

export const api: AxiosInstance = axios.create({
    baseURL: "https://idez-app-erjlhxxoya-uc.a.run.app/api/v1/county/"
})