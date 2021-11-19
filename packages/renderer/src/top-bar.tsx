import React from "react"
import './top-bar.css'

const TopBar : React.FC = () => {
  return (
    <div className="top-bar">
    <ul className="special-btns">
      <li className="submenu-control">
        <button className="file-options special-btn" id="fileOptions">Files</button>
        <ul className="submenu">
          <li><button className="special-btn" id="createFileBtn">New File &emsp;&emsp; Ctrl+N</button></li>
          <li><button className="special-btn" id="openFileBtn">Open File &emsp;&emsp; Ctrl+O</button></li>
          <li><button className="special-btn" id="saveFileBtn" disabled>Save File &emsp;&emsp; Ctrl+S</button></li>
        </ul>
      </li>
      <li className="submenu-control">
        <button className="edit-options special-btn" id="editOptions">Edit</button>
        <ul className="submenu">
          <li><button className="special-btn">Undo &emsp;&emsp; Ctrl+Z</button></li>
          <li><button className="special-btn">Redo &emsp;&emsp; Ctrl+Y</button></li>
        </ul>
      </li>
      <li className="submenu-control">
        <button className="selection-options special-btn" id="selectionOptions">Selection</button>
      </li>
    </ul>
    <div className="title-bar">
      <div className="title-window" id="titleBlackCat">Black Cat Editor</div>
    </div>
    <div className="title-bar-btns">
      <button id="minimizeWindow" className="top-btn minimize-btn">
        <span className="material-icons">minimize</span>
      </button>
      <button id="maximizeWindow" className="top-btn maximize-btn">
        <span className="material-icons">crop_din</span>
      </button>
      <button id="closeWindow" className="top-btn close-btn">
        <span className="material-icons">close</span>
      </button>
    </div>
  </div>
  )
}

export default TopBar
