import React from 'react'
import { TbMoodEmpty } from 'react-icons/tb'
import CollectionItem from './CollectionItem'

function CollectionList({ data }) {
  return (
    <div>
      {
        Array.isArray(data) && data.length > 0 ? (
          <>
            {
              data.map((_item) => {
                return (
                  <CollectionItem key={_item.address} data={_item}/>
                )
              })
            }
          </>
        ) : (
          <div className = "empty-msg">
            <TbMoodEmpty />
            Nothing to display
          </div>
        )
      }
    </div>
  )
}

export default CollectionList