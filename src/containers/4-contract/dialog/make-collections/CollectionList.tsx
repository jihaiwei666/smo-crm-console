/**
 * Created by jiangyukun on 2017/8/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import MakeCollection from './MakeCollection'

import Data from '../../../common/interface/Data'
import {updateCollection, fetchInstitutionList, fetchInstitutionInfo} from '../../contract.action'

interface CollectionListProps {
  contractId: string
  collectionList: any[]
  fetchInstitutionList: (contractId) => void
  institutionList: Data<any[]>
  fetchInstitutionInfo: (institutionId) => void
  institutionInfo: Data<any[]>
  updateCollection: (options) => void
}

class CollectionList extends React.Component<CollectionListProps> {
  render() {
    return (
      <div>
        {
          this.props.collectionList.length == 0 && (
            <div className="add-payment-node-info-first">请先添加付款节点信息</div>
          )
        }
        {
          this.props.collectionList.map((collection, index) => {
            if (!collection.collectionId) return null
            return (
              <MakeCollection
                key={collection.collectionId}
                index={index}
                contractId={this.props.contractId}
                collectionId={collection.collectionId}
                initCollection={collection}
                fetchInstitutionList={this.props.fetchInstitutionList}
                institutionList={this.props.institutionList}
                fetchInstitutionInfo={this.props.fetchInstitutionInfo}
                institutionInfo={this.props.institutionInfo}
                updateCollection={this.props.updateCollection}
              />
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    contractId: props.contractId,
    collectionList: props.collectionList,
    institutionList: state.institutionList,
    institutionInfo: state.institutionInfo
  }
}

export default connect(mapStateToProps, {
  fetchInstitutionList, updateCollection, fetchInstitutionInfo
})(CollectionList)
