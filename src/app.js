const app = require("express")();
const bodyParser = require("body-parser");
const helmet = require("helmet");

const mongo = require("./mongo");

app.use(helmet());
app.use(bodyParser.json());

app.get("/inventory", async (req, res) => {
    const fields = 
        req.query.fields ?
            req.query.fields.split(",")
                .reduce((acc, field) => { 
                    acc[field] = 1;
                    return acc;
                }, {}) :
            undefined;
    const database = await mongo();
    res.send({ list: await database.list(fields) });
});

app.get("/inventory/:id", async (req, res) => {
    const id = req.params.id;
    const database = await mongo();
    const result = await database.find(id);
    res.send(result);
});

app.post("/inventory/:id", async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body;
    const database = await mongo();
    const result = await database.update(id, newStatus);
    if (result.nModified > 0) {
        res.send({ success: true , result: result.result });
    } else { 
        res.send({ success: false, result: result.result });
    }
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
