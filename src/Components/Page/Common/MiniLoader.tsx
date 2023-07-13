import React from 'react'

function MiniLoader({type ="warning", size="1"})
 {
  const styles = {
    scale: size,
  }
  return (
    // <div className={'spinner-border text-+${type}'}
    <div className={'spinner-border text-'+type}
    style={styles}
    >
        
    </div>
  )
}

export default MiniLoader