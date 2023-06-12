import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { getUser, getUsers } from "./teste1";
import teste2 from "./teste2";
import teste3 from "./teste3";
import teste4 from "./teste4";
import teste5 from "./teste5";

const app = express();
const port = 3000;

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req: Request, res: Response) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.get("/user", getUser);
app.get("/users", getUsers);
app.post("/users", teste2);
app.delete("/users", teste3);
app.put("/users", teste4);
app.get("/users/access", teste5);

app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
