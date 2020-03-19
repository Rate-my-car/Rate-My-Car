const bcrypt = require('bcryptjs')

module.exports = {
    async register(req, res){
        console.log(req.body)
        const{email, regUsername, regPassword, firstName, lastName} = req.body
        const userPicture = 'https://rate-my-car.s3-us-west-1.amazonaws.com/87717a38-e5e5-4cc2-8c7f-96d946834ca9-profile-pic.jpg'
        const db = req.app.get('db')
        let [checkUser] = await db.users.get_username(regUsername)
        
        if (checkUser){
            return res.status(409).send('Username is already taken')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(regPassword, salt)
        let newUser = await db.users.register(email,firstName, lastName, hash ,regUsername,userPicture)
        delete newUser[0].password; 
       
        req.session.user = newUser[0]
       
        res.status(202).send(req.session.user)
    },
    async login(req, res){
        const {logUsername, logPassword} = req.body
        const db = req.app.get('db')
        let user = await db.users.get_username(logUsername)
        if(!user[0]){
            return res.status(401).send('username not found')
        }
        let authenticated = bcrypt.compareSync(logPassword, user[0].password)
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
        let user = await db.users.edit_profile(user_id, firstName,lastName,email,userPicture)
        res.status(200).send(user[0])
    }, 
    logout(req, res){
        req.session.destroy()
        res.sendStatus(200)
    }
}