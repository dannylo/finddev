const axios = require('axios');
const Dev = require('../models/Dev');
const parse = require('../utils/parseStringAsArray');

module.exports ={
    async store(request, response) {
        const { github_username, techs , latitude, longitude} = request.body;
        const response_github = await axios.get(`https://api.github.com/users/${github_username}`);
        
        let dev = await Dev.findOne({github_username});

        if(!dev){
            console.log(response_github.data);

            const techsArray = parse(techs);

            //se o name não existir, ele pegará o login.
            const { name = login, avatar_url, bio } = response_github.data;
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
        response.json(dev);
    },

    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    }

};