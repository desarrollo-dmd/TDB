const express = require("express");
const app = express();
app.use(express.json());
const routes = require("./src/routes/routes.js");
const PORT = 3000;

app.use("/", routes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log("servidor corriendo en el puerto" + PORT);
    return;
  }

  console.log("Error iniciando el servidor" + error);
});
