import * as React from 'react';
import { Component } from 'react';


interface ChildrenProps {
  
}
 
interface ChildrenState {
  
}
 
class Children extends React.Component<ChildrenProps, ChildrenState> {
  constructor(props: ChildrenProps) {
    super(props);
    this.state = {};
  }
  render() { 
    return ( 
      <p>child</p>
     );
  }
}
 
export default Children;
