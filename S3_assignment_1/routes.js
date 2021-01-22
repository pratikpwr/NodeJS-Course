const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body>");
    res.write("<h1>Hello World!!!</h1>");
    res.write(
      '<form  action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body>");
    res.write("<h1>List Of Users</h1>");
    res.write("<ul><li>User 1</li></ul>");
    res.write("<ul><li>User 2</li></ul>");
    res.write("<ul><li>User 3</li></ul>");
    res.write("<ul><li>User 4</li></ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const username = parsedData.split("=")[1];
      console.log(username);

      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  }
};

module.exports = requestHandler;
