import { Spin } from 'antd'
import React, { useMemo } from 'react'

export function Loading() {
  return useMemo(
    () => (
      <div style={{ textAlign: 'center', margin: '200px auto' }}>
        <Spin size="large" />
      </div>
    ),
    []
  )
}
