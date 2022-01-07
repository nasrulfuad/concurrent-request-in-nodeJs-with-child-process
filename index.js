const app = require("express")();
const { fork } = require("child_process");

const PORT = 8888;

app.get("/", function (request, response) {
  response.send("This page should be fast");
  response.end();
});

// app.get("/slow", function (request, response) {
//   const fiveBillion = 5_000_000_000;
//   let count = 0;

//   for (let i = 0; i < fiveBillion; i++) {
//     count += i;
//   }

//   response.send(`The final count is : ${count}`);
//   response.end();
// });

app.get("/slow", function (request, response) {
  const childProcess = fork("./my-heavy-process.js"); // <-- fork child process

  childProcess.send("start", function (error) {
    if (error) {
      console.error("Child process error");
      console.error(error.message);
    }
  });

  childProcess.on("message", function (data) {
    response.send(`The final count is : ${data}`);
    response.end();
  });
});

app.listen(PORT, function () {
  console.info(`Server is running on port ${PORT}`);
});
