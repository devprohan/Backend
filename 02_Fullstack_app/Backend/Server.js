import express from "express";

const app = express();
const port = 4000;

// app.get("/", (req, res) => {
//   res.send("Server is Ready");
// });

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "A joke",
      content: "This is a joke",
    },
    {
      id: 2,
      title: "Another joke",
      content: "This is another joke",
    },
    {
      id: 3,
      title: "A joke 3",
      content: "This is a joke no.3",
    },
    {
      id: 4,
      title: "A joke 4",
      content: "This is a joke no.4",
    },
  ];
  res.send(jokes);
});

app.listen(port, () => console.log("server is Listen on:", port));
