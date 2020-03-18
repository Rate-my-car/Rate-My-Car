module.exports = {
    async postCar(req, res){
        const {make, model, year, vin} = req.body
        console.log(req.session)
        const {user_id} = req.session.user
        const db = req.app.get('db')
        let newCar = await db.cars.post_car(make, model, year, vin)
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
        const {car_id, description, milage, price, location} = req.body
        const {user_id} = req.session.user
        let carForSale = await db.cars.car_sale(car_id, user_id, description, milage, price, location)
        res.status(200).send(carForSale)
    },

    async getForSale(req, res) {
        const db = req.app.get('db')
        const {make, model, year, owner, milage, price} = req.body

        db.cars.get_for_sale(make, model, year, owner, milage, price)
        .then((results) => res.status(200).send(results))
    },


    
    async getCar(req,res){
        const db = req.app.get('db')
        const {id} = req.params
        console.log(id)
        let car = await db.cars.get_car(id)
        console.log(car)
        res.status(200).send(car)
    },
    async getMaintenance(req, res){
        const db = req.app.get('db')
        const {id} = req.params
        let maintenance = await db.cars.get_my_services(id)
        res.status(200).send(maintenance)
    }
}