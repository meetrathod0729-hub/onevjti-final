import { useEffect, useState } from "react";
import { searchUsers } from "../api/user.api";

const DashboardUserSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setError("");
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const res = await searchUsers(query);
        setResults(res.data.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You are not authorized to search users.");
        } else {
          setError(
            err.response?.data?.message || "Search failed"
          );
        }
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-96">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border px-3 py-2 rounded w-full"
      />

      {loading && (
        <div className="text-sm mt-2">Searching...</div>
      )}

      {error && (
        <div className="text-sm mt-2 text-red-600">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="absolute top-full left-0 border mt-2 rounded bg-white shadow w-full z-50">
          {results.map((u) => (
            <div
              key={u._id}
              className="p-2 border-b last:border-b-0"
            >
              <div className="font-medium">
                {u.username}
              </div>
              <div className="text-sm text-gray-500">
                {u.email}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardUserSearch;
