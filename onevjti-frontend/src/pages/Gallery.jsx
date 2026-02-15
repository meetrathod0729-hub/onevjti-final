import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const categories = [
  "all",
  "tech",
  "cultural",
  "sports",
  "workshop",
  "general",
];

const Gallery = () => {

  const [images, setImages] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const { user } = useAuth();

  const isAdmin =
    user && ["admin", "head", "core"].includes(user.role);

  /* ================= FETCH ================= */

  const fetchGallery = async (cat = "all") => {
    try {
      setLoading(true);

      const res = await api.get(
        `/gallery?category=${cat}`
      );

      setImages(res.data.data || []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery(active);
  }, [active]);

  /* ================= DELETE ================= */

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this image?")) return;

    try {
      await api.delete(`/gallery/${id}`);

      fetchGallery(active);

    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold">
          📸 Gallery & Highlights
        </h1>

        <p className="text-gray-500 mb-4">
          Relive the best moments at OneVJTI
        </p>

        {/* Upload Button */}
        {isAdmin && (
          <Link
            to="/gallery/upload"
            className="inline-block bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
          >
            + Upload Image
          </Link>
        )}

      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-1 rounded-full border transition
              ${
                active === cat
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600"
              }
            `}
          >
            {cat.toUpperCase()}
          </button>
        ))}

      </div>

      {/* ================= LOADER ================= */}
      {loading && (
        <p className="text-center">Loading...</p>
      )}

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

        {images.map((item) => (

          <div
            key={item._id}
            onClick={() => setPreview(item)}
            className="bg-white rounded-xl shadow hover:scale-105 transition cursor-pointer"
          >

            <img
              src={item.image}
              alt={item.title}
              className="h-52 w-full object-cover rounded-t-xl"
            />

            <div className="p-3">

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">
                {item.event}
              </p>

              {/* Delete Button */}
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id);
                  }}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {preview && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl max-w-lg w-full p-4">

            <img
              src={preview.image}
              alt={preview.title}
              className="rounded-lg mb-3"
            />

            <h3 className="font-bold">
              {preview.title}
            </h3>

            <p className="text-sm text-gray-500">
              {preview.event}
            </p>

            <button
              onClick={() => setPreview(null)}
              className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
