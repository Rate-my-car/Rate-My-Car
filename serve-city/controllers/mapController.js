const axios = require('axios'); 

module.exports = { 
    getLocations: async (req, res) => {
        const {zipCode} = req.body
        console.log(zipCode)
        let locations = await axios.post(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=mechanic+in+${zipCode}&key=AIzaSyAP5TpSDFZwwgWxbVA-Ckxq-Hs1htO8BZ0`).then(res => res.data)

        
        res.status(200).send(locations)
    }

 

}