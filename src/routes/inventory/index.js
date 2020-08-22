const router = require("express").Router();
const mongo = require("../../mongo");

router.get("/inventory", require("./getAll")(mongo));
router.get("/inventory/:id", require("./getOne")(mongo));
router.post("/inventory/:id", require("./updateOne")(mongo));

module.exports = router;
