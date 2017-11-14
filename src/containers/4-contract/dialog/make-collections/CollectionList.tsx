/**
 * Created by jiangyukun on 2017/8/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import MakeCollection from './MakeCollection'

import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import eventBus, {EVENT_NAMES} from '../../../../core/event'
import {updateCollection, fetchInstitutionList, fetchInstitutionInfo, submitBillApply} from '../../contract.action'

interface CollectionListProps extends CommonFunction {
  contractId: string
  initCollectionList: any[]
  collectionList: Data<any>
  fetchInstitutionList: (contractId) => void
  institutionList: Data<any[]>
  fetchInstitutionInfo: (institutionId) => void
  institutionInfo: Data<any[]>
  submitBillApply: (content: string) => void
  submitBillApplySuccess: boolean
  newBillDate: any
  updateCollection: (options) => void
  updateCollectionSuccess: boolean
  editAuthority: boolean
}

class CollectionList extends React.Component<CollectionListProps> {
  static defaultProps = {
    editAuthority: true
  }
  collectionList = []

  componentWillMount() {
    if (this.props.initCollectionList) {
      this.collectionList = this.props.initCollectionList
    }
  }

  componentWillReceiveProps(nextProps: CollectionListProps) {
    if (!this.props.collectionList.loaded && nextProps.collectionList.loaded) {
      this.collectionList = nextProps.collectionList.data
    }
    if (!this.props.updateCollectionSuccess && nextProps.updateCollectionSuccess) {
      this.props.showSuccess('更新收款成功！')
      eventBus.emit(EVENT_NAMES.COLLECTION_UPDATED)
    }
    if (!this.props.contractId && nextProps.contractId) {
      this.props.fetchInstitutionList(nextProps.contractId)
    }
  }

  componentDidMount() {
    if (this.props.contractId) {
      this.props.fetchInstitutionList(this.props.contractId)
    }
  }

  render() {
    return (
      <div className="--module-item">
        {
          this.collectionList.length == 0 && (
            <div className="add-payment-node-info-first">请先添加付款节点信息</div>
          )
        }
        {
          this.collectionList.map((collection, index) => {
            if (!collection.collectionId) return null
            return (
              <MakeCollection
                key={collection.collectionId}
                index={index}
                contractId={this.props.contractId}
                collectionId={collection.collectionId}
                initCollection={collection}
                loaded={this.props.collectionList.loaded}
                institutionList={this.props.institutionList}
                fetchInstitutionInfo={this.props.fetchInstitutionInfo}
                institutionInfo={this.props.institutionInfo}
                submitBillApply={this.props.submitBillApply}
                submitBillApplySuccess={this.props.submitBillApplySuccess}
                newBillDate={this.props.newBillDate}
                updateCollection={this.props.updateCollection}
                editAuthority={this.props.editAuthority}
              />
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    collectionList: state.collectionList,
    institutionList: state.institutionList,
    institutionInfo: state.institutionInfo,
    submitBillApplySuccess: state.contract.submitBillApplySuccess,
    newBillDate: state.contract.newBillDate,
    updateCollectionSuccess: state.contract.updateCollectionSuccess
  }
}

export default connect(mapStateToProps, {
  fetchInstitutionList, updateCollection, fetchInstitutionInfo, submitBillApply
})(addCommonFunction(CollectionList))
