module.exports = (mongo) => async (req, res) => {
    const id = req.params.id;
    const database = await mongo();
    const result = await database.find(id);
    res.send(result);
};
