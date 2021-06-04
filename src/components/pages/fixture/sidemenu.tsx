import React from 'react'
import sidemenuIcon from '../../../assets/sidemenu.svg'
import exit from '../../../assets/exit.svg'
import {IModel} from '../../../store/control/types'
import {HeaderSidebar, IconButton, ListElement} from './index'

const SideMenu = (props: any) => {
  return (
    <>
      <IconButton src={sidemenuIcon} onClick={() => props.toggleMenu()} />
      <div
        className="side-bar"
        style={{
          transform: `translate(${props.xPosition}px)`,
          width: 300
        }}
      >
        <div className="content">
          <HeaderSidebar>Select Model<IconButton isExit src={exit} onClick={() => props.toggleMenu()} /></HeaderSidebar>
          {props.modelList.map((model: IModel) =>
            <ListElement onClick={() => {
              props.toggleMenu();
              props.setModel({ name: model.label, path: model.value, elements: model.elements, rotate: model.rotate })
            }}>{model.label}</ListElement>
          )}
        </div>
      </div>
    </>
  )
}

export default SideMenu;
