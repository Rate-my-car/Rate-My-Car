import React, {useState} from "react"
import axios from "axios"
import {withRouter} from 'react-router-dom'
import {getUser} from '../Duxx/reducer'
import {connect} from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faUser as faUserSolid} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope, faUser as faUserRegular} from '@fortawesome/free-regular-svg-icons'
import './styling/Auth.scss'



const Auth = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [logUsername, setLogUsername] = useState("")
    const [logPassword, setLogPassword] = useState("")
    const [regUsername, setRegUsername] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [email, setEmail] = useState("")
    const [userPicture, setUserPicture] = useState("")
    const [registration, setReg] = useState(false)
    
    // const userPicture = ''
  
    const register = () => {
      axios.post("/auth/register", { email, regUsername, regPassword, firstName, lastName, userPicture}).then(results => {
        
        props.getUser(results.data)
        props.history.push("/")
      }).catch(err => console.log(err))
    }
  
  
    const login = () => {
      axios.post("/auth/login", { logUsername, logPassword }).then(results => {
        props.getUser(results.data)
        props.history.push("/")
      }).catch(err => console.log(err))
    }

    const toggleReg = () => { 
        setReg(!registration)
    }
  
    
    return (
      <div className='auth-container'>
        <div className='login-container'>
          <h1>Login</h1>
          <h4 className='login-register-subheading'>to your account</h4>
          <div className="inputWithIcon">
              <input
                name="logUsername"
                value={logUsername}
                placeholder="Username"
                onChange={e => setLogUsername(e.target.value)}
              />
              <FontAwesomeIcon id='input-icon' icon={faUserSolid}/>
          </div>
          <div className="inputWithIcon">
              <input
                type= "password"
                name="logPassword"
                value={logPassword}
                placeholder="Password"
                onChange={e => setLogPassword(e.target.value)}
              />
              <FontAwesomeIcon id='input-icon' icon={faLock}/>
          </div>
          <button className='auth-btn' onClick = {login}>Login</button>
        </div>


        <div className='register-container'>
          <h1>Register</h1>
            <h4 className='login-register-subheading'>a new account</h4>
            <div className="inputWithIcon">
                <input
                  name="regUsername"
                  value={regUsername}
                  placeholder="Username"
                  onChange={e => setRegUsername(e.target.value)}
                />
                <FontAwesomeIcon id='input-icon' icon={faUserSolid}/>
          </div>
          <div className="inputWithIcon">
                <input
                  name = 'firstName'
                  value = {firstName}
                  placeholder = 'First Name'
                  onChange = {e => setFirstName(e.target.value)}
                />
                <FontAwesomeIcon id='input-icon' icon={faUserRegular}/>
          </div>
          <div className="inputWithIcon">
                <input
                  name = 'lastName'
                  value = {lastName}
                  placeholder = 'Last Name'
                  onChange = {e => setLastName(e.target.value)}
                />
                <FontAwesomeIcon id='input-icon' icon={faUserRegular}/>
          </div>
          <div className="inputWithIcon">
                <input
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                />
                <FontAwesomeIcon id='input-icon' icon={faEnvelope}/>
          </div>
          <div className="inputWithIcon">
              <input
                type= "password"
                name="regPassword"
                value={regPassword}
                placeholder="Password"
                onChange={e => setRegPassword(e.target.value)}
              />
              <FontAwesomeIcon id='input-icon' icon={faLock}/>
          </div>
          <button className='auth-btn' onClick={() => register()}>Register</button>
        </div>
          {/* <div> 
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
          </div> */}
      </div>
    )
  }
  export default connect(null, {getUser})(withRouter(Auth))