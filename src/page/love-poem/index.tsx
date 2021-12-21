import React from 'react'

export interface LovePoemProps {}

const LovePoem: React.FC<LovePoemProps> = () => {
  return (
    <div
      style={{
        fontSize: 40,
        color: '#00E5EE',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: 700
      }}
    >
      爱的诗
    </div>
  )
}

export default LovePoem
