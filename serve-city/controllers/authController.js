const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res){
        console.log(req.body)
        const{email, username, password, firstName, lastName, user_picture} = req.body
        const db = req.app.get('db')
        let checkUser = await db.users.get_username(email)
        if (checkUser[0]){
            return res.status(409).send('email is already used')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let newUser = await db.users.register(email,firstName, lastName, hash ,username)
        delete newUser[0].password; 
        req.session.user = newUser[0]
        console.log(req.session)
        res.status(202).send(req.session.user)
    },
    async login(req, res){
        const {username, password} = req.body
        const db = req.app.get('db')
        let user = await db.users.get_username(username)
        if(!user[0]){
            return res.status(401).send('username not found')
        }
        let authenticated = bcrypt.compareSync(password, user[0].password)
        if(!authenticated){
            return res.status(202).send('password incorrect')
        }
        delete user[0].password; 
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },
    async editProfile(req,res){ 
        const {user_id, userPicture,firstName, lastName, email } = req.body; 
        const db = req.app.get('db')
        console.log(firstName , lastName)
        let user = await db.users.edit_profile(user_id, firstName,lastName,email,userPicture)
        res.status(200).send(user[0])
    }, 
    logout(req, res){
        req.session.destroy()
        res.sendStatus(200)
    }
}