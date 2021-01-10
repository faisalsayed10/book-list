import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const { data, loading, error } = useQuery(getAuthorsQuery);
  const [
    addBook,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const submitBook = (e) => {
    e.preventDefault();
    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  if (error) return <p>Error :(</p>;

  return (
    <>
      <form id="add-book" onSubmit={submitBook}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={(e) => setAuthorId(e.target.value)}>
            <option>Select author</option>
            {loading ? (
              <option disabled>Loading authors</option>
            ) : (
              data.authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))
            )}
          </select>
        </div>
        <button>+</button>
      </form>
      {mutationLoading && <p>Loading...</p>}
      {mutationError && <p>Error :( Please try again</p>}
    </>
  );
}

export default AddBook;
