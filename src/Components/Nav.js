import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {getUser} from '../Duxx/reducer'


class Nav extends Component{
    constructor(){
        super()
        this.state ={

        }
    }

    render(){
        return(
            <div>Nav</div>
        )
    }
}
export default Nav