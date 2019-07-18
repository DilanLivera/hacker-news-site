import React from 'react';
import './Loading.css'

const Loading = (props) => {
  return (
    <div className="loading-container">
      <p className="loading-header">joke for you, while you wait...</p>
      { props.loadingText }
    </div>
  )
};

export default Loading;