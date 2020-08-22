module.exports = token => {
    token = `Token ${token}`;    
    return (req, res, next) => {
        const authorization = req.headers.authorization || undefined;
        if (!authorization) {
            return res.status(404).send({ error: "Missing Token" });
        }

        if (authorization === token) {
            return next();
        } else {
            return res.status(404).send({ error: "Unauthorized" });
        }
    };
};
