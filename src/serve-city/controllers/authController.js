const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res){
        const{email, password, first_name, last_name, user_picture} = req.body
        const db = req.app.get('db')
        let checkUser = await db.users.get_email(email)
        if (!checkUser[0]){
            return res.status(409).send('email is already used')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let newUser = await db.users.register(email, first_name, last_name, hash, user_picture)
        req.session.user = newUser[0]
        res.status(2012).send(req.session.user)
    },
    async login(req, res){
        const {email, password} = req.body
        const db = req.app.get('db')
        let user = await db.users.get_email(email)
        if(!user[0]){
            return res.status(401).send('email not registered')
        }
        let authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(202).send('password incorrect')
        }
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },
    logout(req, res){
        req.session.destroy()
        res.sendStatus(200)
    }
}