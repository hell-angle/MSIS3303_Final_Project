export const SearchMovie = (Search) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/movies/10", requestOptions)
        .then(response => response.text())
        .then(result => {return result})
        .catch(error => console.log('error', error));
}