import env from "../../environment.json";

export const BASE_URL = window.location.hostname === "localhost" 
    ? `http://localhost:${env.api_port}` 
    : env.api_url;

console.log("URL ATUAL DA API:", BASE_URL);