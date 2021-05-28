import React, { useMemo } from 'react'
import './index.less'

export function Loading() {
  return useMemo(() => <div className="spinner" />, [])
}
