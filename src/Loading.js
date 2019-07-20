import React from 'react';
import './Loading.css'

const Loading = (props) => {
  return (
    <div className="loading-container">
      <div>
        <p className="loading-header">joke for you, while you wait...</p>
        { props.loadingText }
      </div>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  )
};

export default Loading;