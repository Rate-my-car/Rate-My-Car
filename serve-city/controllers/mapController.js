require('dotenv').config(); 
const axios = require('axios'); 
const{GOOGLE_API_KEY} = process.env
module.exports = { 
    getLocations: async (req, res) => {
        const {zipCode} = req.body
        // console.log(zipCode)
        let locations = await axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=mechanic+in+${zipCode}&key= ${GOOGLE_API_KEY}`).then(res => res.data)

        
        res.status(200).send(locations)
    }

 

}