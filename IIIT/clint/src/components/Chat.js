import React, {Component} from 'react';
import './Chat.css';
import Messages from './Messages';
import InputF from './InputF';
import Websocket from 'react-websocket';
import StarRatings from 'react-star-ratings';
class Chat extends Component {
  state = {   rating:0,
              messages: [],
              member: {
                username:"",
                color: ""
              }
         }

              
     render(){
       return(
                  
                      <div className="Chat">
                              <div className="Chat-header">
                                      <h1>{"IIITH BOT  👨‍💻"}</h1>
                              </div>
                             
                              <div className="pa3" >
                                     <h6>Overall Rating</h6> 
                                     <StarRatings
                                        rating={this.state.rating}
                                        starDimension="25px"
                                        starRatedColor="blue"
                                        changeRating={this.changeRating}
                                        numberOfStars={4}
                                        name='rating'
                                     
                                     />
                              </div>
                              <div >
                              <Messages
                                messages={this.state.messages}
                                currentMember={this.state.member}
                              />
                              </div>
                              <div>
                              <InputF
                                onSendMessage={this.onsendMessage.bind(this)}
                              />
                              </div>
                              <Websocket url='ws://localhost:5000/'
                                  onMessage={this.handleData.bind(this)}
                                  onOpen={this.handleOpen.bind(this)}
                                  onClose={this.handleClose.bind(this)}
                                  reconnect={true} debug={true}
                                  ref={Websocket => {
                                    this.refWebSocket = Websocket;
                              }}/>

                            
                      </div>
       );
     }
     changeRating=(rating, name)=>{
           this.setState({rating:rating});
     }
      handleData(data) {
        this.createMessage(data, "1", "IIITH-BOT 👨‍💻", "radial-gradient(circle, #ff0606, #df0044, #a80060, #640066, #171256)");
      }
     handleOpen(data)  {
                 console.log("connected:)"+data);
       }
    handleClose() {
              console.log("disconnected");
    }
  
    onsendMessage(message){
         this.createMessage(message, "2", "SAI", "linear-gradient(to right bottom, #014083, #093578, #102a6d, #141e62, #171256)");
         this.refWebSocket.sendMessage(message);
  }
     createMessage(value,id,usrname,color)
     {
      const member = {...this.state.member};
      member.id = id;
      member.username= usrname;
      member.color = color;
      this.setState({member});
       const messages = this.state.messages;
       messages.push({member, text: value});
       this.setState({messages});
     }

}

 
  export default Chat;