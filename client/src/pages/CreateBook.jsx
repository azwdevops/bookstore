import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../shared/axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await API.post("/books", { ...bookData })
      .then((res) => {
        enqueueSnackbar("Book created successfully", { variant: "success" });

        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Error occurred", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
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

export default CreateBook;
