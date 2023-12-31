import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../shared/axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    API.get(`/books/${id}`)
      .then((res) => {
        setBookData(res?.data);
      })
      .catch((err) => {
        console.log(err);
        window.alert("An error occurred");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.put(`/books/${id}`, { ...bookData })
      .then((res) => {
        enqueueSnackbar("Book edited successfully", {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("An error occurred", {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Title
            </label>
            <input
              type="text"
              value={bookData?.title}
              name="title"
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Author
            </label>
            <input
              type="text"
              value={bookData?.author}
              name="author"
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              required
            />
          </div>
          <div className="my-4">
            <label htmlFor="" className="text-xl mr-4 text-gray-500">
              Publish Year
            </label>
            <input
              type="text"
              value={bookData?.publishYear}
              name="publishYear"
              onChange={handleChange}
              className="border-2 border-gray-500 px-4 py-2 w-full"
              required
            />
          </div>
          <button type="submit" className="p-2 bg-sky-300 m-8">
            Save
          </button>
        </div>
      )}
    </form>
  );
};

export default EditBook;
