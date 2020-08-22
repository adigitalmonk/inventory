const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(helmet());
app.use(bodyParser.json());
app.use(require("./routes/inventory"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
