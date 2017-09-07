/**
 * Created by jiangyukun on 2017/8/8.
 */
import React from 'react'
import {connect} from 'react-redux'

import MakeCollection from './MakeCollection'

import Data from '../../../common/interface/Data'
import addCommonFunction from '../../../_frameset/addCommonFunction'
import CommonFunction from '../../../common/interface/CommonFunction'
import {CONTRACT} from '../../../../core/constants/types'
import {updateCollection, fetchInstitutionList, fetchInstitutionInfo, submitBillApply} from '../../contract.action'

interface CollectionListProps extends CommonFunction {
  contractId: string
  collectionList: any[]
  fetchInstitutionList: (contractId) => void
  institutionList: Data<any[]>
  fetchInstitutionInfo: (institutionId) => void
  institutionInfo: Data<any[]>
  submitBillApply: (content: string) => void
  submitBillApplySuccess: boolean
  newBillDate: any
  updateCollection: (options) => void
  updateCollectionSuccess: boolean
}

class CollectionList extends React.Component<CollectionListProps> {
  componentWillReceiveProps(nextProps: CollectionListProps) {
    if (!this.props.updateCollectionSuccess && nextProps.updateCollectionSuccess) {
      this.props.showSuccess('更新收款成功！')
      this.props.clearState(CONTRACT.UPDATE_COLLECTION)
    }
  }

  componentDidMount() {
    this.props.fetchInstitutionList(this.props.contractId)
  }

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
                institutionList={this.props.institutionList}
                fetchInstitutionInfo={this.props.fetchInstitutionInfo}
                institutionInfo={this.props.institutionInfo}
                submitBillApply={this.props.submitBillApply}
                submitBillApplySuccess={this.props.submitBillApplySuccess}
                newBillDate={this.props.newBillDate}
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
    institutionInfo: state.institutionInfo,
    submitBillApplySuccess: state.contract.submitBillApplySuccess,
    newBillDate: state.contract.newBillDate,
    updateCollectionSuccess: state.contract.updateCollectionSuccess
  }
}

export default connect(mapStateToProps, {
  fetchInstitutionList, updateCollection, fetchInstitutionInfo, submitBillApply
})(addCommonFunction(CollectionList))
