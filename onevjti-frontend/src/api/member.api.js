import api from "./axios";

export const getCommitteeMembers = () => api.get("/members");

export const addMember = (userId) =>
  api.post("/members", { userId });

export const removeMember = (memberId) =>
  api.delete(`/members/${memberId}`);

export const updateMemberRole = (memberId, role) =>
  api.patch(`/members/${memberId}/role`, { role });
