import React from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function Book({ selected }) {
  const { data } = useQuery(getBookQuery, {
    variables: { id: `${selected}` },
  });

  return (
    <div className="book-details">
      {data && data.book ? (
        <div>
          <h2>{data.book.name}</h2>
          <p>{data.book.genre}</p>
          <p>{data.book.author.name}</p>
          <p>Other Books By This Author:</p>
          <ul className="other-books">
            {data.book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Book Selected</p>
      )}
    </div>
  );
}

export default Book;
