import { createContext, useState } from "react";

export const BookContext = createContext();

const BookContextProvider = (props) => {
  const [books, setBooks] = useState([
    { title: "Name of wind", id: 1 },
    { title: "Introduction to Python", id: 2 },
    { title: "Learn oop using javascript", id: 3 },
    { title: "Learn python in one day", id: 4 },
  ]);

  const addBook = (title) => {
    setBooks([...books, { title, id: Math.random().toString() }]);
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider value={{ books, addBook, removeBook }}>
      {props.children}
    </BookContext.Provider>
  );
};

export default BookContextProvider;
