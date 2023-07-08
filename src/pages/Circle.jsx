import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

class Circle extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef(); // initialize your ref
  }
  render() {
    return (
      <div className="loader">
      <Player
        ref={this.player} // set the ref to your class instance
        autoplay={true}
        loop={true}
        controls={true} 
  src="data.json"
  ></Player>
  </div>
);
}
}

export default Circle;