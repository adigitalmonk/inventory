module.exports = (mongo) => async (req, res) => {
    const fields = 
        req.query.fields ?
            req.query.fields.split(",")
                .reduce((acc, field) => { 
                    acc[field] = 1;
                    return acc;
                }, {}) :
            undefined;

    const database = await mongo();
    res.send({ 
        list: await database.list(fields)
    });
};
