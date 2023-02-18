import http from 'http';
import {readFile} from 'fs/promises';
import url from 'url';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const host = 'localhost';
const port = 8000;


const requestListener = function (req, res) {
    const route = url.parse(req.url); // запрос в формате: http://localhost:8000/page1?index.html      (? - имя файла, всё что перед - папки. Поиск идет в папке pages и по всем вложенным папкам)
    console.log(route);
    if(route.pathname != '/favicon.ico') {
      if(route.pathname === '/') {
        readFile(__dirname + "/home_page.html")
          .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
      })
    }

    else {
      readFile(__dirname + "/pages" + route.pathname + `/${route.query}`)
      .then(contents => {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(contents);
      })
      .catch(err => { // если путь не найден - вернет страницу с ошибкой.
        readFile(__dirname + "/404.html")
        .then(contents => {
          res.setHeader("Content-Type", "text/html");
          res.writeHead(404);
          res.end(contents);
        })
      })
    }
  }
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
