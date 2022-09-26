const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log('mongo connection open!');
    }).catch(err => {
        console.log('oh no! mongo connection error!');
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({}); // deletes everything in database
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            author: '632c58eaba53f311f051e082',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/db53zegoy/image/upload/v1663867416/YelpCamp/hqrepq5pkkun8pjmtges.avif',
                    filename: 'YelpCamp/hqrepq5pkkun8pjmtges',
                },
                {
                    url: 'https://res.cloudinary.com/db53zegoy/image/upload/v1663867416/YelpCamp/dhxx1ow89jcbnhb5kccy.avif',
                    filename: 'YelpCamp/dhxx1ow89jcbnhb5kccy',
                },
                {
                    url: 'https://res.cloudinary.com/db53zegoy/image/upload/v1663867416/YelpCamp/t2551ulizpgbltb2bgvn.avif',
                    filename: 'YelpCamp/t2551ulizpgbltb2bgvn',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque sit odio distinctio sint molestias aliquam sed, necessitatibus veritatis consectetur laborum ea saepe ut corporis architecto recusandae. Officia, quo id?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            }
        });
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
