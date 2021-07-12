/* eslint-disable no-undef */
const category = require('../controllers/category.controller');
// const app = require('../index');
// const mongoose = require('mongoose');
const supertest = require('supertest');

// beforeEach((done) => {
//     mongoose.connect(process.env.DB_URL,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         },
//         () => done());
// });

// afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(() => done());
//     });
// });

test('Creating a new category', async () => {
    await request(category).post('/')
        .send({
            name: 'Che cac loai',
            active: true,
            bannerImage: 'www.picture.com/banner',
            index: 2,
        })
        .expect(201);
});