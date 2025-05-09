import React, { useState, useEffect } from "react";
import axios from "axios";

const CarouselEditor = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [carousels, setCarousels] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImage, setEditImage] = useState(null);

  const fetchCarousels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/carousel", {
        withCredentials: true,
      });
      setCarousels(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching carousels:", err);
      setCarousels([]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image || !title) return alert("Image and title are required");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);

    try {
      await axios.post("http://localhost:5000/api/carousel", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setTitle("");
      setImage(null);
      fetchCarousels();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/carousel/${id}`, {
        withCredentials: true,
      });
      fetchCarousels();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (carousel) => {
    setEditId(carousel._id);
    setEditTitle(carousel.title);
    setEditImage(null);
    setEditModal(true);
  };

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("title", editTitle);
    if (editImage) formData.append("image", editImage);

    try {
      await axios.put(
        `http://localhost:5000/api/carousel/${editId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      setEditModal(false);
      fetchCarousels();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCarousels();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage Carousel</h2>

      <form onSubmit={handleUpload} className="mb-8">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 mr-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {carousels.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={`../../../public/images/${item.image}`}
              alt={item.title}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => openEditModal(item)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Carousel</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full border p-2 mb-4"
              placeholder="Enter new title"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="w-full border p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselEditor;
