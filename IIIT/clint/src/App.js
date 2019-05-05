import React ,{Component}from 'react';
import WhatsappTabUi from './components/WhatsappTabUi';
import './App.css';
const styl= {
  width: '100%',
  height: 120
};

class App extends Component {

  render(){
    

  return (
    <div >
      <div className="header pa2 grow shadow-5 mb2 mt1" style={styl}>
    
      <div align="center" className="white f3">IIIT-H  PRODUCT LABS</div>
      <div> <h4 align="center" className="white">Legal Document Analyzer</h4></div>
      </div >
      <div>
           <WhatsappTabUi />
      </div>
    
    </div>
  );
  }
}


export default App;
