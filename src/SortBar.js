import React from 'react';
import './SortBar.css';

function SortBar(props) {
  let btnList = props.btnList;

  return (
    <div className="sort-btn-container">
      { btnList.map( btn => <button className="sort-btn">{ btn }</button>) }
    </div>
  );
}

export default SortBar;