import React, { Suspense, FunctionComponent, useState, useEffect, useCallback } from 'react'
import { ConfigProvider, Spin } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import zhCN from 'antd/lib/locale/zh_CN'
import { LoadingOutlined } from '@ant-design/icons'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import { UserContext } from './stores/index'
import { Loading } from './components/loading'
import { routes } from './routes'
import './index.css'

/// 国际化
dayjs.locale('zh-cn')

/// 全局默认 Spin
Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)

export const App: FunctionComponent = () => {
  const [user, setUser] = useState({})

 

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </UserContext.Provider>
  )
}

