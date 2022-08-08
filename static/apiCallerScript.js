
function myFunction() {  
    fetch('http://localhost:3000/informationFetch').then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        const dataString = JSON.stringify(data);
        document.getElementById('output').innerHTML = dataString;
        console.log("Booo");
      });

}

