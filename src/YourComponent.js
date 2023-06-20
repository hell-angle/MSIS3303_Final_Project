/*import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';

const YourComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/movies/all_title") // Replace with the appropriate API endpoint
      .then(response => response.json())
      .then(data => {
        setOptions(data.titles); // Assuming the API response has the key 'titles' containing the options
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleOptionChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedValues);
  };

  return (
    <Container>
      <Row>
        <h1>Booking ticket</h1>
      </Row>
      <select multiple value={selectedOptions} onChange={handleOptionChange}>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </Container>
  );
};

export default YourComponent;
*/
import React, { useState, useEffect } from 'react';
import { Container, Row, Form } from 'react-bootstrap';

const YourComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/movies/all_title") // Replace with the appropriate API endpoint
      .then(response => response.json())
      .then(data => {
        setOptions(data.titles); // Assuming the API response has the key 'titles' containing the movie titles
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  return (
    <Container>
      <Form>
        <Form.Group controlId="formMovie">
          <Form.Label>Select a movie:</Form.Label>
          <Form.Control as="select" value={selectedOption} onChange={handleOptionChange}>
            <option value="">Select a movie</option>
            {options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default YourComponent;
