import axios from "axios";


const baseUrl = "http://localhost:8000";

export const ReqClass = {
    getReq: async (endPoint) => {
        return await axios.get(`${baseUrl}${endPoint}`);
    },
    postReq: async (endPoint, reqBody) => {
        return axios.post(`${baseUrl}${endPoint}`, reqBody);
    },
    putReq: async (endPoint, reqBody) => {
        return axios.put(`${baseUrl}${endPoint}`, reqBody);
    },
    deleteReq: async (endPoint, reqBody) => {
            return axios.delete(`${baseUrl}${endPoint}`, reqBody);
        }
};