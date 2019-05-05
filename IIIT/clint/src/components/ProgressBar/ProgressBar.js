import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const Bar = styled.div`
     width:100%;
     height:20px;
     background-color:#ffff;
     border-radius:10px;
     box-shadow: inset 0 0 5px white;`;
const Line = styled.div`
      width: ${props => props.percentage}%;
      height:100%;
      background-image: radial-gradient(circle, #4b00fd, #ad0069, #7e000f, #401800, #161511);
      border-radius: 8px;
      transition: width 0.3s ease-in-out;
`;

export default class ProgressBar extends Component{
    velocity=(min, value, max)=> {
              return Math.min(Math.max(min,value), max);
    }
render(){

            return(
                <Bar>
                       <Line percentage={this.velocity(0,this.props.percentage, 100)}/>
                </Bar>
            );

}   
}

ProgressBar.PropTyes = {
    percentage: PropTypes.number,
};