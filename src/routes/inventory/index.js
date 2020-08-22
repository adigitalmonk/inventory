const router = require("express").Router();
const checkToken = require("../../middleware/checkToken")(process.env.ACCESS_TOKEN);
const mongo = require("../../mongo");

router.use(checkToken);
router.get("/inventory", require("./getAll")(mongo));
router.get("/inventory/:id", require("./getOne")(mongo));
router.post("/inventory/:id", require("./updateOne")(mongo));

module.exports = router;
