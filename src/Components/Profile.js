import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {v4 as randomString} from 'uuid'; 
import Dropzone from 'react-dropzone'; 
import axios from 'axios'; 

import swal from 'sweetalert2'; 
import {getUser} from '../Duxx/reducer'

const Profile = (props) => {

const[isUploading, setUploading] = useState(false); 
const [userPicture, setUserPicture] = useState(''); 
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')

const getSignedRequest = ([file]) => { 
        
    setUploading(true); 
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`; 
    axios.get('/api/signs3', { 
        params: {
            'file-name': fileName, 
            'file-type': file.type
        }
    })
    .then(response => { 
        const {signedRequest,url} = response.data; 
        uploadFile(file,signedRequest,url); 
    })
    .catch(err => { 
        console.log(err)
    })
}

const uploadFile = (file,signedRequest,url)  => { 
    const options = { 
        headers: {
            'Content-Type': file.type
        }
    }; 
    axios.put(signedRequest,file,options)
    .then(res => { 
        setUploading(false)
        setUserPicture(url)
    })
    .catch(err => { 
        setUploading(false); 
        swal.fire({
            title: 'Error!',
            text: 'Photo Not Uploaded', 
            icon:'error',
            confirmButtonText: 'OK'
        })
        // alert(err);
        if(err.response === 403){ 
            console.log(`Your request for a signed URL failed with a status 403.`); 
        }
        else {
            console.log(`ERROR: ${err.status}\n ${err.stack}`);
        }
    })
}

const saveChanges = (user_id,userPicture, firstName, lastName, email) => { 
    
    if(!userPicture){userPicture = props.user.userPicture;}
    if(!firstName){firstName = props.user.first_name;}
    if(!lastName){lastName = props.user.last_name;}
    if(email){email = props.user.email;}
    axios.post('/auth/profile', {user_id,userPicture,firstName,lastName,email}).then(res => getUser(res.data))
    
}


// useEffect()

    return(
        console.log(props.user),
        <div>
            <img src = {userPicture} />
            <Dropzone onDropAccepted = {(file) => getSignedRequest(file)} accept = 'image/*' multiple= {false} >
                    {({getRootProps, getInputProps}) => (
                    <div  {...getRootProps()}>
                    <input {...getInputProps()} />
                        {isUploading ? <span>Loading...</span> : 
                        <span className = 'dropzone'>Click Here to Upload Picture</span>}
                    </div>
                )}
            </Dropzone>
            <h2>{props.user.username}</h2>
            <p>FIRST NAME:</p>
            <input placeholder = {props.user.first_name} onChange = {e => setFirstName(e.target.value)}/>
            <p>LAST NAME:</p>
            <input placeholder  = {props.user.last_name} onChange = {e => setLastName(e.target.value)}/>
            <p>EMAIL:</p>
            <input placeholder = {props.user.email} onChange = {e => setEmail(e.target.value)} /> 
            <button onClick = {() => saveChanges(props.user.user_id,userPicture, firstName,lastName, email)} >Save Changes</button>
        </div>
    )
}

function mapStateToProps(state){ 
    return{user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(Profile); 