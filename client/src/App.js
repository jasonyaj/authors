import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import CreateAuthor from "./components/CreateAuthor";
import UpdateOne from "./components/UpdateOne";
import Container from "react-bootstrap/Container";

function App() {
  // useStates, combined with useEffect and removeFromDom function to refresh list without refreshing the whole page, just the DOM
  const [authors, setAuthors] = useState([]);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/authors")
      .then((res) => {
        setAuthors(res.data);
        // setLoaded(true);
      })
      .catch((err) => console.error(err));
  }, []);

  const removeFromDom = (authorId) => {
    setAuthors(authors.filter((author) => author._id !== authorId));
  };

  return (
    <div>
      <h1>Favorite authors</h1> {/*this will render on all routes */}
      <Container>
        <Routes>
          {/* Route to display all the authors, path is set to show on landing page */}
          <Route
            path="/"
            element={
              <Main
                authors={authors}
                setAuthors={setAuthors}
                removeFromDom={removeFromDom}
              />
            }
          />
          {/* Route for form to add in a new author */}
          <Route path="/new" element={<CreateAuthor />} />{" "}
          {/* Route to update the author of current "Update" button clicked on */}
          <Route path="/:id/edit" element={<UpdateOne />} />{" "}
        </Routes>
      </Container>
    </div>
  );
}

export default App;
