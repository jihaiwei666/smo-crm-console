/**
 * Created by jiangyukun on 2017/8/8.
 */
import React from 'react'
import MakeCollection from './MakeCollection'

interface CollectionListProps {
  collectionList: any[]
  updateCollection: (options) => void
}

class CollectionList extends React.Component<CollectionListProps> {
  render() {
    return (
      <div>
        {
          this.props.collectionList.map((collection, index) => {
            if (!collection.collectionId) return null
            return (
              <MakeCollection
                key={collection.collectionId}
                collectionId={collection.collectionId}
                initCollection={collection}
                updateCollection={this.props.updateCollection}
              />
            )
          })
        }
      </div>
    )
  }
}

export default CollectionList
