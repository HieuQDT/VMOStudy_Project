/* eslint-disable no-undef */
const app = require('../index');
const request = require('supertest');

///////////////////////////////////// SET UP ROUTES
const categoryRouter = require('../routes/category.routes');
app.use('/category', categoryRouter);

const userRouter = require('../routes/user.routes');
app.use('/user', userRouter);

afterEach(async () => {
    await app.close();
});

///////////////////////////////////// CATEGORY CREATE TEST
describe('NEW CATEGORY CREATE', () => {
    it('Creating a new category', async () => {
        await request(app)
            .post('/category/')
            .send({
                name: 'Che cac loai',
                active: true,
                bannerImage: 'www.picture.com/banner',
                index: 2,
            })
            .expect(401);
    });
});

// afterEach((done) => {
//     mongoose.connection.db.dropDatabase(() => {
//         mongoose.connection.close(() => done());
//     });
// });