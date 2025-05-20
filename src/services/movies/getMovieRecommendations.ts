import api from "../api";

export const getMovieRecommendations = async (id: number) => {
  const res = await api.get(`${id}/recommendations`);
  return res.data.results;
};
