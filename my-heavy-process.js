process.on("message", function (data) {
  let count = 0;

  if (data === "start") {
    const tenBillion = 5_000_000_000;

    for (let i = 0; i < tenBillion; i++) {
      count += i;
    }
  }

  process.send(count);

  process.exit(); // <-- kill child process
});
