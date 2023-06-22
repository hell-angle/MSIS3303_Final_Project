import "./App.css";
import { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
export const MovieCreate = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieReleaseDate, setMovieReleaseDate] = useState(null);
  const [movieDuration, setMovieDuration] = useState("");
  const [movieGenre, setMovieGenre] = useState("Classical");
  const [movieDirector, setMovieDirector] = useState("");
  const [movieCast, setMovieCast] = useState("");
  const [movieShowTimeID, setMovieShowTimeID] = useState("");
  const [titleAvailability, setTitleAvailability] = useState(true); // Track title availability
  const handleDateChange = (date) => {
    setMovieReleaseDate(date);
  };
  const createMovie = () => {
    if (movieDuration === "" || movieGenre === "" || movieShowTimeID === "") {
      window.alert("Hãy nhập đầy đủ các thông tin");
      return;
    }
    const formattedReleaseDate = movieReleaseDate
      ? format(movieReleaseDate, "yyyy-MM-dd")
      : "";
    const movieData = {
      Title: movieTitle,
      Release_Date: movieReleaseDate,
      Duration: movieDuration,
      Genre: movieGenre,
      Director: movieDirector,
      Cast: movieCast,
      Showtime_ID: movieShowTimeID,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movieData),
      redirect: "follow",
    };

    fetch("http://127.0.0.1:5000/movies", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        // Show success alert
      window.alert("Movie added successfully!");
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    checkTitleAvailability();
  }, [movieTitle]); // Call the function whenever movieTitle change

  const checkTitleAvailability = () => {
    // Make an API request to your Flask backend to check title availability
    fetch("http://127.0.0.1:5000/movies/all_title")
      .then((response) => response.json())
      .then((data) => {
        const titles = data.titles;
        const isAvailable = !titles.includes(movieTitle);
        setTitleAvailability(isAvailable);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="App">
      <Form>
        <h2>Add movie</h2>
        <Row className="mb-3 margin-top">
          <Form.Group as={Col} controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="input title"
              onChange={(e) => setMovieTitle(e.target.value)}
            />
            {!titleAvailability && <span>Title available, please change title</span>}
          </Form.Group>
          <Form.Group as={Col} controlId="formReleaseDate">
            <Form.Label>Release Date</Form.Label>
            <DatePicker
              selected={movieReleaseDate}
              onChange={(date) => handleDateChange(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              className="form-control"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDuration">
            <Form.Label>Movie Duration</Form.Label>
            <Form.Control
              placeholder="input Duration"
              onChange={(e) => setMovieDuration(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="fromGenre">
            <Form.Label>Movie's Genre</Form.Label>
            <Form.Control
              placeholder="input Genre"
              onChange={(e) => setMovieGenre(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formDirector">
            <Form.Label>Movie's Director</Form.Label>
            <Form.Control
              placeholder="input Director"
              onChange={(e) => setMovieDirector(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formCast">
            <Form.Label>Movie's Cast</Form.Label>
            <Form.Control
              placeholder="input Cast"
              onChange={(e) => setMovieCast(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="fromShowtimeID">
            <Form.Label>Movie's Show Time</Form.Label>
            <Form.Control
              placeholder="input show time ID"
              onChange={(e) => setMovieShowTimeID(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" onClick={createMovie} disabled={!titleAvailability} >
          Save
        </Button>
      </Form>
    </div>
  );
};