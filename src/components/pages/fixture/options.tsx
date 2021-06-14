import React from 'react'

const Options = (props: any) => {
  return (
    <div className="options">
      {
        props.currentModel.elements.map((item: { name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
          return (
            <div
              className={props.activeOption === item.name ? 'option  --is-active' : 'option'}
              onClick={props.selectOption}
              data-option={item.name}
            >
              {(item.name as string).charAt(0).toUpperCase() + (item.name as string).replace('_', ' ').slice(1)}
            </div>
          )
        })
      }
    </div>
  )
}

export default Options;
