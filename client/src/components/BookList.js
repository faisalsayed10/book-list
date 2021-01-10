import React from "react";
import { useQuery, gql } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  console.log(data);

  return (
    <div>
      <ul className="book-list">
        <li>Book 1</li>
      </ul>
    </div>
  );
}

export default BookList;
