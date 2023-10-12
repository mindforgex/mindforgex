import React from 'react'
import CollectionItem from './CollectionItem'
import EmptyMsg from '../EmptyMsg'

function CollectionList({ data, onFetchCollection }) {
  return (
    <div>
      {
        Array.isArray(data) && data.length > 0 ? (
          <>
            {
              data.map((_item) => {
                return (
                  <CollectionItem onFetchCollection={onFetchCollection} key={_item.address} data={_item}/>
                )
              })
            }
          </>
        ) : (
          <EmptyMsg />
        )
      }
    </div>
  )
}

export default CollectionList
