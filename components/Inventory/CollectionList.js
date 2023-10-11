import React from 'react'
import { TbMoodEmpty } from 'react-icons/tb'
import CollectionItem from './CollectionItem'
import EmptyMsg from '../EmptyMsg'

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
          <EmptyMsg />
        )
      }
    </div>
  )
}

export default CollectionList
