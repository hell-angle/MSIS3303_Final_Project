export const ListMovie = () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://127.0.0.1:5000/movies", requestOptions)
        .then(response => response.text())
        .then(result => {return result})
        .catch(error => console.log('error', error));
}