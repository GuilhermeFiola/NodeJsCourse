const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    //res.write("<body><h1>Greeting message</h1></body>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write(
      "<body><ul><li>User Test 1</li><li>User Test 2</li><li>User Test 3</li></ul></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method == "POST") {
    const body = [];

    req.on("data", chunk => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
    });
  }

  res.end();
};

module.exports = requestHandler;
