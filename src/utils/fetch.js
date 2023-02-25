import axios from "axios";
import { BASE_URL, APPLICATION_ID, REST_API_KEY } from "@env";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["X-Parse-Application-Id"] = APPLICATION_ID;
axios.defaults.headers.common["X-Parse-REST-API-Key"] = REST_API_KEY;
axios.defaults.headers.post["Content-Type"] = "application/json";

export default async (url, body, method = "POST") => {
  const options = {
    method,
    url,
    data: method !== "GET" ? body : null,
  };

  const res = await axios(options);
  return res.data;
};
