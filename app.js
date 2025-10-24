const express = require("express");
const app = express();
const itemsRoutes = require("./items");
const ExpressError = require("./middleware/errors");
const items = require("./fakeDb");

app.use(express.json());
app.use("/items", itemsRoutes);

/** 404 handler */
app.use(function (req, res, next) {
    return res.status(404).json({ error: "Not Found" });
})

/** generic error handler */
app.use(function (err, req, res, next) {
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: message, 
    });
});

module.exports = app;