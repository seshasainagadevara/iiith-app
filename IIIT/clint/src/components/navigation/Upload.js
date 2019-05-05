import React, {Component} from 'react';
import './Upload.css';
import axios from 'axios';
import styled from 'styled-components';
import ProgressBar from '../ProgressBar/ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Listing from './Listing';

const ProgressBarBox = styled.div`
       width:300px;
       margin-top:10px;
`;
class Upload extends Component{

    state={
        selectedFile:null,  
        loaded:0,
    }

render(){

    return(
        <div >
            <div>
                      <ToastContainer/>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                        <input 
                        type='file'
                        name='file' 
                        onChange={this.onChangeHandler}
                        className='divv tc pa2 shadow-2 ba 1px b--navy bw2 br-pill mt4 '/>

            </div>
           
            <div style={{display: 'flex', justifyContent: 'center'}}>
              
                        <ProgressBarBox>
                            <ProgressBar percentage={this.state.loaded}/>
                        </ProgressBarBox>
            </div>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button 
                                className=" upload tc pa2 shadow-2 ba 1px  bw2  mt2 grow btn btn-success btn-block"  
                                type="button"  
                                onClick={this.onClkHandler}>UPLOAD
                        </button> 
             </div>

             <div style={{width:"100%"}}>
                 <Listing/>
             </div>

        </div>
    );
}
onChangeHandler = event => {
    this.setState({
        selectedFile:event.target.files[0],
        loaded: 0,
    });
   
}
onClkHandler = ()=>{
    const data = new FormData();
    data.append('file', this.state.selectedFile);
    // console.log(data);
    axios.post("http://localhost:5000/upload",data,{
            onUploadProgress : ProgressEvent =>{
                this.setState({
                    loaded : (ProgressEvent.loaded/ProgressEvent.total*100),
                })
            },

    }).then((response)=>{      toast.success("Upload Success 😁🤟"); 
                               console.log(response.statusText);
                        }).catch(err=>{
                                 toast.error('Upload failed ☹️! Please add File/check internet.');
                        }); 
}

}

export default Upload;