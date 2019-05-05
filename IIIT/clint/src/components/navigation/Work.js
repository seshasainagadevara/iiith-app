import React, {Component} from 'react';
import './Work.css';
import Upload from './Upload';
class Work extends Component{

render(){
                return(
                        <div >
                             <p  className="hed tc mt4 ml3 mr3 b pa2 shadow-2 helvetica  b--light-gold bw2 br-pill dim">
                              {"UPLOAD YOUR DOCUMENT "}
                             </p>
                             <div style={{display: 'flex', justifyContent: 'center'}}>
                              <Upload/>
                             </div>
                             
                            
                        </div>
                );

}

}


export default Work;