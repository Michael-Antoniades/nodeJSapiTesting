
function myFunction() {  
    fetch('http://localhost:3000/informationFetch').then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
        const dataString = JSON.stringify(data);
        document.getElementById('output').innerHTML = dataString;
      });

}

function myFunction2() {  
  fetch('https://nextdaybeats.auth.us-east-2.amazoncognito.com/oauth2/authorize?response_type=code&client_id=6p9l03ckllen5s65svcrba3h1a&scope=openid&redirect_uri=http://localhost:3000/signedIn').then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      const dataString = JSON.stringify(data);
      document.getElementById('output').innerHTML = dataString;
    });

}


function newUserAdd() {
  
}



// users.insert(user.nickname, function (err, inserted) { 
//   client.close();

//   if (err) return callback(err);
//   callback(null);
// });