const axios = require('axios');
const Dev = require('../models/Dev');

module.exports ={
    async store(request, reponse) {
        const { github_username, techs , latitude, longitude} = request.body;
        const response_github = await axios.get(`https://api.github.com/users/${github_username}`);
        
        console.log(response_github.data);

        const techsArray = techs.split(',').map(tech => tech.trim());

        //se o name não existir, ele pegará o login.
        const { name = login, avatar_url, bio } = response_github.data;
        
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };

        const devSaved = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location,
        });

        response.send(devSaved);
    },

};