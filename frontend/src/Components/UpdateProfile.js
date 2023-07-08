import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const UpdateProfile = ({data,getUserInfo}) => {
    const [file, setFile] = useState();
    const [preview, setPreview] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0])
      }
      useEffect(() => {
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
              reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      }, [file]);
    const handleUpload = () => {
        const formdata = new FormData();
        formdata.append('image', file);
        formdata.append('ID', data?.id);
    
        axios.post('http://localhost:8081/upload/profile/image', formdata)
        .then(res => {
            if(res.data.Status === "Success") {
              console.log("Succeded");
              alert("profile picture updated")
              getUserInfo()
            } else {
              console.log("Failed");
            }
        })
        .catch(err => console.log(err));
      }
  return (
    <div>
       <div className="container">
      <div className="row profile">
          <div className="profile-content">
            <h3 className='p-2 text-success mt-5'>Update Profile Picture</h3>
            <div className='container col-md-12 p-2'>
                <div className='card mb-4'>
                    <div className='card-body'>
                        <div className='col-md-12 p-3'>
                            <div className="form-group mb-3">
                              <div className='row'>
                              <div className='col-md-8'>
                                <input type='file' onChange={handleFile} className='form-control' />
                                {preview ?  <img src={preview} className="mt-4 " style={{border:"none",height:'100px',width:"100px"}}/> :""}
                              </div>
                              </div>
                              <div className='col-md-4 mt-4'>
                                <Button  disabled = {file ? false:true}onClick={handleUpload} style={!file?{background:'#ccc',border:'none'}:{}}><i className='fa fa-upload'></i> Upload</Button>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default UpdateProfile
