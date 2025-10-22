const exampleController = {
    getExample: (req, res) => {
        res.json({ message: "This is an example response from the server." });
    },
    postExample: (req, res) => {
        const data = req.body;
        res.status(201).json({ message: "Data received", data });
    }
};

module.exports = exampleController;