const fetch = require('node-fetch');
const fs = require('fs') 
  
const api_request = (num) => {
  fetch(`https://rickandmortyapi.com/api/character/?page=${num}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    writeToFile(data)
  })
}

const writeToFile = (data) => {
  var jsonContent = JSON.stringify(data);
  console.log(jsonContent);
  
 fs.appendFile('Output.txt', jsonContent, (err) => { 
      if (err) throw err; 
    }) 
}

for (let i=1; i<25; ++i ) {
  api_request(i)
}
