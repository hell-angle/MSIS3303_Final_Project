export const CreateAdmin = (movie) => {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var movieData = JSON.parse(movie);
    console.log(movieData)
    var raw = JSON.stringify({
        "title":movieData.title,
        "releaseD": movieData.releaseD,
        "duration": movieData.duration,
        "genre": movieData.genre,
        "director": movieData.director,
        "cast": movieData.cast,
        "showtime": movieData.showtime
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://127.0.0.1:5000/movies", requestOptions)
    .then(response => response.text())
    .then(result => { return result})
    .catch(error => console.log('error', error));
}
