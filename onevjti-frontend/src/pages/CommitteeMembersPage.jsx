import { useEffect, useState } from "react";
import {
  getCommitteeMembers,
  addMember,
  removeMember,
  updateMemberRole,
} from "../api/member.api";
import { useAuth } from "../context/AuthContext";

const CommitteeMembersPage = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUserId, setNewUserId] = useState("");
  const [myRole, setMyRole] = useState(null);
  const [unauthorized, setUnauthorized] = useState(false);


  const fetchMembers = async () => {
  try {
    const res = await getCommitteeMembers();
    const list = res.data.data;
    setMembers(list);

    const me = list.find(
      (m) => m.user && m.user._id === user?._id
    );
    setMyRole(me?.role || null);
    setUnauthorized(false);
  } catch (err) {
    if (err.response?.status === 403) {
      setUnauthorized(true);
    } else {
      console.error(err);
    }
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    if (user) fetchMembers();
  }, [user]);

  const handleAddMember = async () => {
    if (!newUserId) return;

    await addMember(newUserId);
    setNewUserId("");
    fetchMembers();
  };

  const handleRemove = async (memberId) => {
    await removeMember(memberId);
    fetchMembers();
  };

  const handleRoleChange = async (memberId, role) => {
    await updateMemberRole(memberId, role);
    fetchMembers();
  };

  if (loading) return <p>Loading members...</p>;

  if (unauthorized) {
  return (
    <div className="p-10 flex justify-center">
      <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-2">
          Access Denied
        </h2>
        <p>
          You are not authorized to view committee members.
        </p>
      </div>
    </div>
  );
}


  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Committee Members
      </h2>

      {/* Head Only: Add Member */}
      {myRole === "head" && (
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            placeholder="Enter User ID"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            className="border px-3 py-2 rounded w-80"
          />
          <button
            onClick={handleAddMember}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Member
          </button>
        </div>
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td className="p-2 border">
                {m.user.username}
              </td>
              <td className="p-2 border">
                {m.user.email}
              </td>
              <td className="p-2 border">
                {myRole === "head" && m.role !== "head" ? (
                  <select
                    value={m.role}
                    onChange={(e) =>
                      handleRoleChange(m._id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="member">Member</option>
                    <option value="core">Core</option>
                  </select>
                ) : (
                  m.role
                )}
              </td>
              <td className="p-2 border">
                {myRole === "head" &&
                  m.role !== "head" &&
                  m.user._id !== user?._id && (
                    <button
                      onClick={() => handleRemove(m._id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeMembersPage;
