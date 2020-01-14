const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');

const routes = Router();

routes.post('/devs', async (request, response) => {
    const { github_username, techs } = request.body;
    const response_github = await axios.get(`https://api.github.com/users/${github_username}`);
    
    console.log(response_github.data);

    const techsArray = techs.split(',').map(tech => tech.trim());

    //se o name não existir, ele pegará o login.
    const { name = login, avatar_url, bio } = response_github.data;
    
    const devSaved = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
    });

    response.send(devSaved);
});

module.exports = routes;