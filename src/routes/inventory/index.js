const router = require("express").Router();
const mongo = require("../../mongo");

if (process.env.ACCESS_TOKEN) {
    router.use(require("../../middleware/checkToken")(process.env.ACCESS_TOKEN));
}

router.get("/inventory", require("./getAll")(mongo));
router.get("/inventory/:id", require("./getOne")(mongo));
router.post("/inventory/:id", require("./updateOne")(mongo));

module.exports = router;
