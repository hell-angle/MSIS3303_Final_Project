import "./App.css";
import { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { CreateAdmin } from "./service/CreateAdmin";
import { HOST, PORT } from "./constant";
export const MovieAdmin = () => {
  const [movieList, setMovieList] = useState([]);
  //const targetCopy = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMovieList();
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const fetchMovieList = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/movies", requestOptions)
        .then(response => response.text())
        .then(result => {
            result = JSON.parse(result)
            setMovieList(result)
        })
        .catch(error => console.log('error', error));
  };

  const deleteMovie = (title) => {
    var requestOptions = {
      method: "DELETE",
      redirect: "follow",
    };

    fetch(`http://${HOST}:5000/movies/${title}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        fetchMovieList();
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <h2>Movie list</h2>
      <Table className="margin-top" responsive>
        <thead>
          <tr>
            <th>ID Movie</th>
            <th>Name of Movie</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((e) => {
            return (
              <tr key={e.ID}>
                <td>{e.ID}</td>
                <td>{e.title}</td>
                <td>
                  <Button
                    className="margin-right"
                    onClick={() => deleteMovie(e.title)}
                    variant="danger"
                  >
                    DELETE
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
