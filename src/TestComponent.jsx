import React from 'react';

class TestComponent extends React.Component{
  render(){

    return (
      <div>
      {this.props.headers ? <div>Your User-Agent: {this.props.headers['User-Agent']}</div>: 'loading'}
      </div>
    );
  }
}

export default TestComponent;