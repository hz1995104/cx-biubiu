import React, { Component } from 'react'
import { RouteConfigComponentProps } from 'react-router-config'
import { Link } from 'react-router-dom'
import './index.less'

class NotFound extends Component<RouteConfigComponentProps> {
  render() {
    return (
      <div className="page-404">
        <div className="bg-img" />
        <div className="content">
          <h1>404</h1>
          <div className="desc">抱歉，你访问的页面不存在</div>
          <Link className="ant-btn ant-btn-primary" to="/">
            返回首页
          </Link>
        </div>
      </div>
    )
  }
}

export default NotFound
