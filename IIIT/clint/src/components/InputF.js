
import React, {Component} from "react";

class InputF extends Component {
  state = {
    text: " "
  }

  onChange(e) {
    this.setState({text: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({text:" "});
    console.log(this.state.text);
    this.props.onSendMessage(this.state.text);
    
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.onSubmit(e)}>
          <input
            onChange={e => this.onChange(e)}
            value={this.state.text}
            type="text"
            placeholder="Start Typing.........."
            autoFocus={false}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default InputF;