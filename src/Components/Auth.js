import React, { useState } from "react"
import axios from "axios"
import {withRouter} from 'react-router-dom'
import {getUser} from '../Duxx/reducer'
import {connect} from 'react-redux'



const Auth = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [userPicture, setUserPicture] = useState("")
    const [registration, setReg] = useState(false)
    
  
  
    const register = () => {
      axios.post("/auth/register", { email, username, password, firstName, lastName, userPicture}).then(results => {
        
        props.getUser(results.data)
        props.history.push("/")
      })
    }
  
  
    const login = () => {
      axios.post("/auth/login", { username, password }).then(results => {
        props.getUser(results.data)
        props.history.push("/")
      })
    }

    const toggleReg = () => { 
        setReg(!registration)
    }
  
    
    return (
      <div>
  
  
          <div> 
          <div>
            </div>
              <div> 
                  <p>{'USERNAME:'}</p>
                  <input
                          name="username"
                          value={username}
                          placeholder="username"
                          onChange={e => setUsername(e.target.value)}
                  ></input>
              </div>
  
              <div >
                  <p>{'PASSWORD:'}</p>
                  <input
                          type= "password"
                          name="password"
                          value={password}
                          placeholder="password"
                          onChange={e => setPassword(e.target.value)}
                  ></input>
              </div >
             
                    <div >
                        <p>FIRST NAME:</p>
                        <input
                            name = 'fistName'
                            value = {firstName}
                            placeholder = 'First Name'
                            onChange = {e => setFirstName(e.target.value)}
                        />
                        <p>LAST NAME:</p>
                        <input
                            name = 'lastName'
                            value = {lastName}
                            placeholder = 'Last Name'
                            onChange = {e => setLastName(e.target.value)}
                        />
                        <p>{'EMAIL:'}</p>
                        <input
                            name="email"
                            value={email}
                            placeholder="email"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button onClick = {toggleReg}>Go To Login</button>
                        <button
                        onClick = {() => register()}
                        >Register</button>

                    </div>
                    
                    <div>
                        
                        <button
                            onClick = {login}
                        >Login</button>
                    </div>
                

              <button onClick={() => props.history.push('/')}>Take Me Back To HQ Home</button>
          </div>
      </div>
    )
  }
  export default connect(null, {getUser})(withRouter(Auth))