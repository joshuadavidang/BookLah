import axios from "axios";

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
};

const backendAxiosPost = async (url: string, data: any) => {
  const response = await axios.post(url, data, {
    withCredentials: true,
  });
  return response.data;
};

const backendAxiosPut = async (url: string, data: any) => {
  const response = await axios.put(url, data, {
    withCredentials: true,
  });
  return response.data;
};

const backendAxiosDelete = async (url: string) => {
  const response = await axios.delete(url, {
    withCredentials: true,
  });
  return response.data;
};

export { fetcher, backendAxiosPost, backendAxiosPut, backendAxiosDelete };
