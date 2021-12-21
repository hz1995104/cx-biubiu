import * as React from 'react'

interface ChildrenProps {}

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
    setTimeout(() => {
      this.setState({ name: 'msm' })
    }, 1000)
  }

  render() {
    return <button onClick={this.handleOnclick}>点击</button>
  }
}

export default Children
