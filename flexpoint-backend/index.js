const express = require("express");
const cors = require("cors");
const connection = require("./connection");

const userRouter = require("./routes/user");
const customerRouter = require("./routes/customer");
const supplierRouter = require("./routes/supplier");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/product");
const ordersRouter = require("./routes/orders");
const dashboardRouter = require("./routes/dashboard");
const testRouter = require("./routes/test");

const app = express();

// Configure CORS to allow requests from your Angular app
const corsOptions = {
  origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/customer", customerRouter);
app.use("/supplier", supplierRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/orders", ordersRouter);
app.use("/dashboard", dashboardRouter);
app.use("/api", testRouter);
module.exports = app;
