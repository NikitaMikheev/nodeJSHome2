const http = require("http");

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    res.writeHead(200);
    req.write('Hello');
    res.end('Первый сервер');
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Сервер по адресу http://${host}:${port}`);
})

async function zapros() { // попытка запроса на сервер
  let response = await fetch(); // ТУТ УКАЗАТЬ URL !!!
  console.log(response);
}

zapros();