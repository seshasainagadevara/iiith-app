import React, {Component} from 'react';
import axios from 'axios';
import './Listing.css';


export default class Listing extends Component{
state={
    toggle:true,
    buttonVal:"SHOW FILES",
    data:["PREVIOUSLY ACCESSED LEGAL DOCUMENTS"]
}
render(){
  

    return(
            <div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <h3  className="mt4">Previously accessed Files</h3>
                </div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button onClick={this.toggleHandler} 
                        className="toggle tc pa2 shadow-2 ba 1px  bw2  mt1 grow btn btn-success btn-block"  
                        type="button" name="listall" >{this.state.buttonVal}</button> 
                </div>
                <div className="scrol mt4" style={{ height:"200px",display: 'flex', justifyContent: 'center'}} >
                        <ul >
                                
                                        {this.state.data.map(item => (
                                                <div className="cardItem" key={item}>
                                                <li className="itm mt2 f6 pa1" style={{width:"100%", height:"35px"}} key={item}>
                                                       <h5> {item.toString().replace("GMT+0530 (India Standard Time)", "")}</h5>
                                                </li>
                                                </div>
                                        ))}
                                
                            
                        </ul>
                    </div>
                
            </div>
                
                            
              );
}
toggleHandler=(event)=>{
        
      if(this.state.toggle===true)
      {
            axios.get(`http://localhost:5000/listall`)
            .then(res => {
                const persons = res.data;
               
                this.setState({data:persons, toggle:false, buttonVal:"HIDE FILES"});
            });                

      }
      else{
                    
         this.setState({data:["PREVIOUSLY ACCESSED LEGAL DOCUMENTS"],toggle:true,buttonVal:"SHOW FILES"});
      }

    }

}
