import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ children, btnLabel, btnCloseLabel }, ref) => {
  const [visible, setVisible] = useState(false)

  const showBtn = { display: `${visible ? 'none' : 'inline'}` }
  const showChildren = { display: `${visible ? 'inline' : 'none'}` }

  function toggleVisibility() {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ display: 'inline' }}>
      <div style={showBtn}>
        <button onClick={toggleVisibility} className='btn-show-content'>{btnLabel}</button>
      </div>

      <div style={showChildren} data-testid='togglable-hide-content' className='togglable-content'>
        {children}
        <button
          style={{ marginTop: '5px' }}
          onClick={toggleVisibility}>{btnCloseLabel ?? 'close'}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable