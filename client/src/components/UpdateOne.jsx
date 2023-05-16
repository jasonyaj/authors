import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

const CreateAuthor = () => {
  const nav = useNavigate();
  // useParams id to be passed around
  const { id } = useParams();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState([]);

  // get the data right away
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/authors/${id}`)
      .then((serverRes) => {
        setName(serverRes.data.name);
      })
      .catch((serverErr) => console.log(serverErr));
  }, [id]);

  // ***function to update the current author
  const updateAuthor = (e) => {
    e.preventDefault();

    // create the object that mimics the MODEL
    const tempObjToSendToServer = {
      name: name,
    };

    // send it to the server
    axios
      .patch("http://localhost:8000/api/authors/" + id, tempObjToSendToServer)
      .then((serverRes) => {
        // ! always clog the server response
        console.log("✔️", serverRes.data);
        nav("/");
      })
      .catch((err) => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) {
          // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message);
        }
        // Set Errors
        setErrors(errorArr);
      });
  };

  // ***function for cancel button to redirect
  const cancel = () => {
    nav(`/`);
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <p style={{ color: "purple" }}>Edit this author</p>
      <legend>
        <form onSubmit={updateAuthor}>
          {errors.map((err, index) => (
            <p key={index}>{err}</p>
          ))}
          <p>Name:</p>
          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button onClick={cancel} className="mx-2">
            Cancel
          </Button>
          <Button type="submit">Update</Button>
        </form>
      </legend>
    </div>
  );
};

export default CreateAuthor;
