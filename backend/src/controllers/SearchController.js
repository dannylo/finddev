const parse = require('../utils/parseStringAsArray');
const Dev = require('../models/Dev');

module.exports ={
    async index(request, response){
        const{ latitude, longitude, techs } = request.query;
        const techAsArray = parse(techs);

        const devs = await Dev.find({
            techs: {
                $in: techAsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });

        response.json(devs);
    },
}