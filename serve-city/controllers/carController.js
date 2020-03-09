module.exports = {
    async postCar(req, res){
        const {make, model, year, vin} = req.body
        const {user_id} = req.session.user
        const db = req.app.get('db')
        let newCar = await db.cars.post_car(make, model, year, vin)
        await db.cars.post_my_car(newCar[0].car_id, user_id)
        res.status(200).send(newCar)
    },
    async getMyCars(req, res){
        const db = req.app.get('db')
        const {user_id} = req.session.user
        let myCars = await db.cars.get_my_car(user_id)
        res.status(200).send(myCars)
    },
    async addMaintenance(req, res){
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {car_id, description, service_done} = req.body
        let newMaintenance = await db.cars.add_maintenance(user_id, car_id, description, service_done)
        res.status(200).send(newMaintenance)
    }
}