import React, {useState} from "react";
import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import Book from "./Book";

function BookList() {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [selected, setSelected] = useState(null)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <ul className="book-list">
        {data.books.map((book) => (
          <li onClick={(e) => setSelected(book.id)} key={book.id}>
            {book.name}
          </li>
        ))}
      </ul>
      <Book selected={selected} />
    </div>
  );
}

export default BookList;
