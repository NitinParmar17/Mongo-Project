// const fetch = require('isomorphic-fetch');
const axios = require('axios');

async function getAPIData(link) {
    try {
        // const response = await fetch(link);
        const response = await axios.get(link);
        if (response.status == 200) {
            return response.data;
        } else {
            console.log('Request failed with status:', response.status);
        }
    } catch (error) {
        console.log('Request failed with error:', error);
    }
}

module.exports = { getAPIData };