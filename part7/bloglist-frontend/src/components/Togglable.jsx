import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ children, btnLabel }, ref) => {
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
    <div>
      <div style={showBtn}>
        <button
          onClick={toggleVisibility}
          className='btn btn-info text-white'>
          {btnLabel}
        </button>
      </div>

      <div style={showChildren} data-testid='togglable-hide-content' className='togglable-content'>
        {children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable