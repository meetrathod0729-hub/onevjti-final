import api from "./axios";

export const searchUsers = (query) =>
  api.get(`/users/search?q=${encodeURIComponent(query)}`);
