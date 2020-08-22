module.exports = mongo => async (req, res) => {
    const id = req.params.id;
    const newStatus = req.body;
    const database = await mongo();
    const result = await database.update(id, newStatus);
    if (result.nModified > 0) {
        res.send({ success: true , result: result.result });
    } else { 
        res.send({ success: false, result: result.result });
    }
};