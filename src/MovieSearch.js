import './App.css';
import { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { HOST, PORT } from './constant'

export const MovieSearch = () => {
    const [movie, setMovie] = useState(null)
    const [findingMovieID, setFindingMovieID] = useState(null)
    const [searchFirstTime, setsearchFirstTime] = useState(false)
    
    const fetchmovie = (ID) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://${HOST}:5000/movies/${ID}`, requestOptions)
        .then(response => response.text())
        .then(result => { result = JSON.parse(result)
                        setMovie(result)
        })
        .catch(error => console.log('error', error));
        console.log(movie.ID)
    }
    const handleFindingMovieIDChange = (number) => {
        setFindingMovieID(number);
    };
    return (
        <div className="App">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <h2>Search Movie</h2>
                    <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        value={findingMovieID}
                        onChangeText={handleFindingMovieIDChange}
                        placeholder="Input movie ID"
                        />
                    </View>
                    </View>
                    <Button className="margin-top" variant="primary" onClick={() => fetchmovie(findingMovieID)}>
                        Find
                    </Button>
                    <br />
                    {movie != null && <Table className="margin-top" striped bordered hover variant="primary">
                        <thead>
                            <tr>
                                <th>movie's information</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>movie ID</td>
                                <td>{movie.ID}</td>
                            </tr>
                            <tr>
                                <td>movie's title</td>
                                <td>{movie.Title}</td>
                            </tr>
                            <tr>
                                <td>movie's release date</td>
                                <td>{movie.Release_Date}</td>
                            </tr>
                            <tr>
                                <td>movie's duration</td>
                                <td>{movie.Duration}</td>
                            </tr>
                            <tr>
                                <td>movie's genre</td>
                                <td>{movie.Genre}</td>
                            </tr>
                        </tbody>
                    </Table>}
                    {searchFirstTime && movie == null && <Form.Label>Movie Not Found</Form.Label>}
                </Form.Group>
            </Form>
        </div>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    input: {
      fontSize: 16,
    },
});


