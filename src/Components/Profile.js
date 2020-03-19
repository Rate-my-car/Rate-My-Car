import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {v4 as randomString} from 'uuid'; 
import Dropzone from 'react-dropzone'; 
import axios from 'axios'; 
import swal from 'sweetalert2'; 
import {getUser} from '../Duxx/reducer'
import Swal from 'sweetalert2'
import './styling/Profile.scss'

const Profile = (props) => {

const[isUploading, setUploading] = useState(false); 
const [userPicture, setUserPicture] = useState(''); 
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')
const [email, setEmail] = useState('')
const [edit, setEdit] = useState(false)

const toggleEdit  = () => {
    setEdit(!edit)
}

const logout = () => {
    axios.post('/auth/logout')
    .then(props.getUser({}))
    .then(props.history.push('/'))
}

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




useEffect(() => {
    rerender();
}, [getUser])


const rerender = () => {
    // axios.get(`/api/cart/${props.user.customer_order_id}`)
    // .then(res => props.setCart(res.data))
    // .catch(err => console.log(err))
}


const saveChanges = (user_id,userPicture, firstName, lastName, email) => { 
    
    if(!userPicture){userPicture = props.user.user_picture;}
    if(!firstName){firstName = props.user.first_name;}
    if(!lastName){lastName = props.user.last_name;}
    if(!email){email = props.user.email;}
    axios.post('/auth/profile', {user_id,userPicture,firstName,lastName,email}).then(res => getUser(res.data))
    .then(() => {
        Swal.fire({
            title: 'Update Successful',
            text: 'Please log back in to view changes.',
            icon: 'success',
            confirmButtonText: 'OK'
          })
    })
    .then(() => {
        setEdit(false)
    })
    .then(() => {
        axios.post('/auth/logout')
        .then(props.getUser({}))
        .then(props.history.push('/'))
    })
}



// useEffect()

    return(
        // console.log(props.user)
        <div className='profile-page-container'>
            <img className='profile-hero-pic' src='https://rate-my-car.s3-us-west-1.amazonaws.com/772fcf58-0f8a-4915-b731-1e4a21ead2f6-tekton-UuO9Jdu2d7E-unsplash-flipped.jpg' alt='Mechanic Tools'/>
            <div className='profile-primary-info'>
                <div className='current-profile-pic-container'>
                    <img className='current-profile-pic' src={props.user.user_picture} alt='Users Profile Picture'/>
                </div>
                <div className='username-container'>
                    <p className='profile-sub-heading'>Username</p>
                    <h1>{props.user.username}</h1>
                    <hr className='profile-line'/>
                </div>
            </div>
            <div className='profile-secondary-info-container'>
                <div className='profile-secondary-info'>
                    <p className='profile-sub-heading'>First Name</p>
                    <h3 id='secondary-info'>{props.user.first_name}</h3>
                </div>
                <div className='profile-secondary-info'>
                    <p className='profile-sub-heading'>Last Name</p>
                    <h3 id='secondary-info'>{props.user.last_name}</h3>
                </div>
                <div className='profile-secondary-info'>
                    <p className='profile-sub-heading'>Email</p>
                    <h3 id='secondary-info'>{props.user.email}</h3>
                </div>
                <button className='profile-edit-button' onClick={toggleEdit}>Edit</button>
            </div>
            <div className='logout-btn-container'>
                <button className='logout-btn' onClick={logout}>Logout</button>
            </div>
            


            {edit ? (
                <div >
                    <div className='edit-profile-pop-up-container'>
                        <h2 className='popup-heading'>Update Profile</h2>
                        <hr className='centered-line'/>
                        {userPicture ? (
                            <img className='new-profile-pic' src={null || userPicture} />
                        ) : (
                            <Dropzone onDropAccepted = {(file) => getSignedRequest(file)} accept = 'image/*' multiple= {false} >
                                {({getRootProps, getInputProps}) => (
                                <div  className='dropzone-btn' {...getRootProps()}>
                                <input {...getInputProps()} />
                                    {isUploading ? <span>Loading...</span> : 
                                    <span>Upload New Profile Pic</span>}
                                </div>
                            )}
                        </Dropzone>
                        )}
                        
                        <input placeholder='First Name' className='popup-input' onChange = {e => setFirstName(e.target.value)}/>
                        <input placeholder='Last Name' className='popup-input' onChange = {e => setLastName(e.target.value)}/>
                        <input placeholder='Email' className='popup-input' onChange = {e => setEmail(e.target.value)} /> 
                        <div className='edit-profile-btns'>
                            <button className='cancel-btn' onClick={toggleEdit}>Cancel</button>
                            <button className='save-btn' onClick = {() => saveChanges(props.user.user_id,userPicture, firstName,lastName, email)}>Save</button>
                        </div>
                    </div>
                    <div className='background-overlay' onClick={toggleEdit}></div>
                </div>
            ) : (
                null
            ) }
            
        </div>
    )
}

function mapStateToProps(state){ 
    return{user: state.reducer.user}
}

export default connect(mapStateToProps, {getUser})(Profile); 