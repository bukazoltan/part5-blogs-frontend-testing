import { useState } from 'react'
import PropTypes from 'prop-types'

function Togglable(props) {
  const [isVisible, setIsVisible] = useState(false)

  const showWhenVisible = { display: isVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div>
      <div style={showWhenVisible}>
        <div>
          {props.children}
        </div>
      </div>
      <div>
        <button id={props.buttonId} onClick={toggleVisibility}>{isVisible ? 'Cancel' : props.buttonLabel}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
