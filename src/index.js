/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// calling router
const categoryRouter = require('./routes/category.routes');
const userRouter = require('./routes/user.routes');
const itemRouter = require('./routes/item.routes');
const fsaleRouter = require('./routes/flashSale.routes');
const voucherRouter = require('./routes/voucher.routes');
const orderRouter = require('./routes/order.routes');

// parse requests of content-type - application/json
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set port, listen for requests
const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

// set database
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

// Route
app.use('/category', categoryRouter);
app.use('/item', itemRouter);
app.use('/user', userRouter);
app.use('/fsale', fsaleRouter);
app.use('/voucher', voucherRouter);
app.use('/order', orderRouter);

// swagger set up 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../API_TEST/API TEST.postman_collection.json-Swagger20.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
