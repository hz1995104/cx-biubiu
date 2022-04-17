import * as React from 'react'
import { Button } from 'antd'

interface ChildrenProps {
  age: number
}

interface ChildrenState {
  name: string
}

class Children extends React.Component<ChildrenProps, ChildrenState> {
  constructor(props: ChildrenProps) {
    super(props)
    this.state = {
      name: 'cx'
    }
  }

  handleOnclick = () => {
    this.setState({ name: 'msm' })
  }

  render() {
    console.log('render', this.props.age)
    return (
      <Button
        style={{ float: 'right', marginRight: 30, width: 150 }}
        type="primary"
        onClick={this.handleOnclick}
      >
        点击
      </Button>
    )
  }
}

export default Children
