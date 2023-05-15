import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Main = (props) => {
  const { authors, setAuthors } = props;
  const { removeFromDom } = props;
  const nav = useNavigate();

  // get the data right away
  useEffect(() => {
    // make the call to the server
    axios
      .get("http://localhost:8000/api/authors")
      .then((serverRes) => {
        // ! always clog the server response
        console.log("✅ SERVER SUCCESS => ", serverRes.data);
        setAuthors(serverRes.data);
      })
      .catch((err) => {
        console.log("❌ SERVER ERROR", err);
      });
  }, []); //with no 2nd parameter in the array it loads right away

  // function to delete the one
  const deleteMe = (authorId) => {
    console.log("delete", authorId);
    axios
      .delete("http://localhost:8000/api/authors/" + authorId)
      .then((res) => {
        removeFromDom(authorId);
      })
      .catch((err) => console.log(err));
  };

  // function for button link to edit a single author
  const updateMe = (authorId) => {
    nav(`/${authorId}/edit`);
  };

  return (
    <div>
      <Link to="/new">Add an author</Link>
      <p style={{ color: "purple" }}>We have quotes by:</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Author</th>
            <th>Actions available</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => {
            return (
              <tr key={author._id}>
                <td>{author.name}</td>
                <td>
                  <Button onClick={() => deleteMe(author._id)} className="mx-2">
                    Delete
                  </Button>
                  <Button onClick={() => updateMe(author._id)} className="mx-2">
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Main;
