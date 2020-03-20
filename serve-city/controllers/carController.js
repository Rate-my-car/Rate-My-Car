module.exports = {
    async postCar(req, res){
        const {make, model, year, vin, carPicture} = req.body
        // console.log(req.session)
        const {user_id} = req.session.user
        const db = req.app.get('db')
        let newCar = await db.cars.post_car(make, model, year, vin, carPicture)
        await db.cars.post_my_car(newCar[0].car_id, user_id)
        res.status(200).send(newCar)
    },
    async getMyCars(req, res){
        const db = req.app.get('db')
        const {user_id} = req.session.user
        let myCars = await db.cars.get_my_cars(user_id)
        res.status(200).send(myCars)
    },
    async addMaintenance(req, res){
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {id, description, service_done, milage, date_serviced, receipt} = req.body
        let newMaintenance = await db.cars.add_maintenance(user_id, id, description, service_done, milage, date_serviced, receipt)
        res.status(200).send(newMaintenance)
    },
    async addForSale(req, res){
        const db = req.app.get('db')
        const {car_id, car_image, description, milage, price, location} = req.body
        const {user_id} = req.session.user
        let carForSale = await db.cars.sale_car(car_id, user_id, description, milage, price, location)
        res.status(200).send(carForSale)
    },

    async getForSale(req, res) {
        const db = req.app.get('db')
        const {car_image, make, model, year, owner, milage, price} = req.body

        db.cars.get_for_sale(car_image, make, model, year, owner, milage, price)
        .then((results) => res.status(200).send(results))
    },
    async searchCar(req, res){
        const db = req.app.get('db')
        const {model} = req.body
        let cars = await db.cars.search_car(model)
        res.status(200).send(cars)
    },
    async getCar(req,res){
        const db = req.app.get('db')
        const {id} = req.params
        // console.log(id)
        let car = await db.cars.get_car(id)
        // console.log(car)
        res.status(200).send(car)
    },
    async getMaintenance(req, res){
        const db = req.app.get('db')
        const {id} = req.params
        let maintenance = await db.cars.get_my_services(id)
        res.status(200).send(maintenance)
    },
    async getOwnership(req, res){
        const db = req.app.get('db')
        const {id} = req.params
        let ownership = await db.cars.get_ownership(id)
        res.status(200).send(ownership)
    },
    async checkOwner(req,res){ 
        const db =  req.app.get('db')
        const {id} = req.body
        // console.log(id)
        let owner = await db.cars.check_owner(id)
        // console.log(owner)
        res.status(200).send(owner)
    }
}