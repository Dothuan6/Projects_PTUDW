const contactsRouter = require("./app/routes/contact.route");
const express = require("express");
const cors = require("cors");
//xu ly loi
const ApiError = require('./app/api-error');

const app = express();
app.use("/api/contacts",contactsRouter);

app.use((reg,res,next)=>{
    return next(new ApiError(404,'Resource not found'));
});

app.use((reg,res,next)=>{
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error"
    });
});
module.exports = app;