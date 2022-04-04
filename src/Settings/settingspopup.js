import React from 'react'

function settingpopup(props) {
    return (props.trigger)?(
        <div className='settingspopup'>
            <div className='settingspopup-inner'>
                <button className='settingspopupclose-btn' onClick={()=> props.setTrigger(false)}>Close</button>
                {props.children}
            </div>
        </div>
    ): "";
  }

export default settingpopup