import http from 'http';
import {readFile} from 'fs/promises';

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    readFile("C:/Users/Никита/Desktop/nodeJsHomework2/nodeJSHome2/web-server/index.html")
    .then(contents => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(contents);
    })
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Сервер по адресу http://${host}:${port}`);
})

// async function zapros() { // попытка запроса на сервер. Запрос сработал!
//   let response = await fetch('http://localhost:8000'); 
//   let text = await response.text();
//   console.log(text);
// }

// zapros();