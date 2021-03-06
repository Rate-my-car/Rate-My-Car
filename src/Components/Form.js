import React, {useState} from 'react';
import axios from 'axios'
import { withRouter } from 'react-router-dom';
// import {connect} from 'react-redux';
import {v4 as randomString} from 'uuid'; 
import Dropzone from 'react-dropzone'; 
import swal from 'sweetalert2'; 
import './styling/Form.scss'




const Form = (props) => {
    const[isUploading, setUploading] = useState(false); 
    const [carPicture, setCarPicture] = useState(''); 
    const [inputs, handleInputs] = useState({model: '', make: '', year: '', vin: ''})

    const postCar = () => {
        const {model, make, year, vin} = inputs
        axios.post('/api/car', {model, make, year, vin, carPicture}).then((res)=> {
            props.history.push(`/vehicles/${res.data[0].car_id}`)
        })
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
            setCarPicture(url)
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
    


    return(
        <div className='form-container'>
            <h2>Add Vehicle</h2>
            <hr className='centered-line'/>
            {carPicture ? (
                            <img className='new-vehicle-pic' src={null || carPicture} />
                        ) : (
                            <Dropzone onDropAccepted = {(file) => getSignedRequest(file)} accept = 'image/*' multiple= {false} >
                                {({getRootProps, getInputProps}) => (
                                <div  className='dropzone-btn' id='upload-vehicle-pic-btn' {...getRootProps()}>
                                <input {...getInputProps()} />
                                    {isUploading ? <span>Loading...</span> : 
                                    <span>Upload Vehicle Pic</span>}
                                </div>
                            )}
                        </Dropzone>
                        )}
            <input placeholder='Year' type='number' onChange={(e)=>handleInputs({...inputs, year: e.target.value})} />
            <input placeholder='Make' onChange={(e)=>handleInputs({...inputs, make: e.target.value})} />
            <input placeholder='Model' onChange={(e)=>handleInputs({...inputs, model: e.target.value})} />
            <input placeholder='VIN' onChange={(e)=>handleInputs({...inputs, vin: e.target.value})} />
            <div className='add-car-form-btns'>
                <button className='add-car-cancel-btn' onClick={() => props.history.push('/MyVehicles')}>Cancel</button>
                <button className='add-car-add-btn' onClick={postCar}>Add Vehicle</button>
            </div>
        </div>
    )
}
export default withRouter(Form)