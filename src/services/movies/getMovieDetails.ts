import api from "../api";

export const getMovieDetails = async (id: number) => {
  const res = await api.get(`${id}`);
  return res.data;
};
