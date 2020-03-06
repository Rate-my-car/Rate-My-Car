import React, { useState } from "react"
import axios from "axios"
import {withRouter} from 'react-router-dom'
import {getUser} from '../Duxx/reducer'
import {connect} from 'react-redux'



const Auth = ({history, getUser}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    
  
  
    // const register = () => {
    //   axios.post("/auth/register", { username, password, email }).then(results => {
    //     history.push("/")
    //   })
    // }
  
  
    // const login = () => {
    //   axios.post("/auth/login", { username, password, email }).then(results => {
    //     getUser(results.data)
    //     history.push("/")
    //   })
    // }
  
    
  
  
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
                  <p>{'EMAIL:'}</p>
                  <input
                          name="email"
                          value={email}
                          placeholder="email"
                          onChange={e => setEmail(e.target.value)}
                  ></input>
              </div>
              <button
                  
                  onClick = {() => login()}
                  >Login</button>
              <button
                  
                  onClick = {() => register()}
              >Register</button>
              <button onClick={() => history.push('/')}>Take Me Back To HQ Home</button>
          </div>
      </div>
    )
  }
  export default connect(null, {getUser})(withRouter(Auth))