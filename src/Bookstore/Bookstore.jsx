import React, { useState, useEffect } from "react";
import Bookdata from "../BookDetails/Book.json";

const Bookstore = ({ darkMode }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setData(Bookdata);
  }, []);

  // Filter books based on search term
  const filteredBooks = data.filter((book) =>
    book.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const Containerclass = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-black";

  // Function to handle opening the modal and setting the selected book
  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-20 mb-5 ${Containerclass}`}
      >
        <input
          type="text"
          placeholder="Search books..."
          className={`w-full px-4 py-2 mb-4 rounded-md border ${
            darkMode ? "border-gray-700" : "border-gray-300"
          } focus:outline-none focus:ring focus:border-blue-300`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div
                key={index}
                className="max-w-xs rounded overflow-hidden shadow-lg bg-white"
                onClick={() => openModal(book)}
              >
                <img
                  className="w-full h-64 object-cover object-center"
                  src={process.env.PUBLIC_URL + "/" + book.Image}
                  alt={book.Title}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-black">{book.Title}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full m-0">
              <h1 className="text-center text-gray-700 font-bold">
                Book is not available
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBook && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-4 max-w-md mx-auto rounded-lg">
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <img
              src={process.env.PUBLIC_URL + "/" + selectedBook.Image}
              alt={selectedBook.Title}
              className="w-full h-40 object-cover object-center mb-4"
            />
            <h2 className="text-xl font-bold mb-2 text-black">{selectedBook.Title}</h2>
            <div className="flex  rounded-md p-4 shadow-md">
              <div className="w-1/2">
                <p className="text-gray-700 mb-2 font-bold">Author:</p>
                <p className="text-gray-700">{selectedBook.Authors}</p>
              </div>
              <div className="w-1/2 ml-4">
                <p className="text-gray-700 mb-2 font-bold">Genre:</p>
                <p className="text-black">{selectedBook.Genre}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-700">{selectedBook.Summary}</p>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Bookstore;
