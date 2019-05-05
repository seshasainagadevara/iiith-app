import React ,{Component}from 'react';
import 'tachyons';
import './WhatsappTabUi.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import './navigation/Work'
import Work from './navigation/Work';
import Chat from './Chat';

const UI = {
   
   tabHeaders:{
      background : '#006064',
      color: "#ffff",
   },  
  
   tabPage: {
      width:'100%',
      minHeight:"500px",      
      // color: '#fff',
    },
    workPage: {
      backgroundColor: '#fafafa',
    },
    chatPage: {
      backgroundColor: '#fafafa',
    }
    
}

class WhatsappTabUi extends Component {
  
 state = {
    tabIndex : 0
 }

handleOnTabHeaderClick = (event, value)=>{
   this.setState({
      tabIndex : value,
   });
}

handleSwipedIndex = index =>{
   this.setState({
      tabIndex:index,
   });
}

   render(){
      const {tabIndex} = this.state;
  return (
     <div>
            <Tabs style={UI.tabHeaders} 
                  value={tabIndex} 
                  variant="fullWidth"
                  onChange={this.handleOnTabHeaderClick}
                  >
              
               <Tab label="WORK" className={'dim'}/>
               <Tab label="CHAT" className={'dim'}/>
            </Tabs>
            <SwipeableViews index={tabIndex}  
            onChangeIndex = {this.handleSwipedIndex} 
        
            enableMouseEvents>
               
                 <div style={Object.assign({}, UI.tabPage, UI.workPage)} >
                   <Work/>
                 </div>
                 <div style={Object.assign({}, UI.tabPage, UI.chatPage)}>
                    <Chat className="chatScreen"/>
                 </div>
            </SwipeableViews>
     </div>
     //this.props.todos.map((val)=> <h2 className='f1 tc'>{val.task+" ,"}</h2>) 
  );
  }
}


export default WhatsappTabUi;
