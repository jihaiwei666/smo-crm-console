/**
 * 报价前
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'
import {connect} from 'react-redux'
import Form from 'app-core/form/Form'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import Input from '../../../../components/form/Input'
import Select1 from 'app-core/common/Select1'
import Radio from '../../../../components/form/radio/Radio'
import TextArea from 'app-core/form/TextArea'
import Button from '../../../../components/button/Button'
import Save from '../../../common/Save'
import Update from '../../../common/Update'

import {SERVICE_TYPE, POSSIBILITY} from '../../project.constant'
import {addBeforeQuotation, updateBeforeQuotation} from '../../project.action'

interface BeforeQuotationProps {
  projectId: string
  beforeQuotationId?: string
  addBeforeQuotation: (options) => void
  initBeforeQuotation: any
  updateBeforeQuotation: (options) => void
}

class BeforeQuotation extends React.Component<BeforeQuotationProps> {
  state = {
    valid: true,

    indication: '',
    serviceType: [],
    centerNumber: '',
    enrollmentCount: '',
    enrollmentPeriod: '',
    bidParty: '',
    cro: '',
    projectCategory: '',
    categoryRemark: '',
    testPeriod: '',
    planCode: '',
    researchProduct: '',
    treatDomain: '',
    filterCount: '',
    possibility: '',
    isArrangeBid: null,
    bidSupportPM: '',
    remark: '',
    attachment: '',
    roster: '',

  }

  add = () => {
    this.props.addBeforeQuotation({
      "projectBeforeOffer": {
        "project_info_id": this.props.projectId,
        "indication": this.state.indication,
        "service_type": this.state.serviceType.join(','),
        "center_number": this.state.centerNumber,
        "group_number": this.state.enrollmentCount,
        "group_stage": this.state.enrollmentPeriod,
        "bidders": this.state.bidParty,
        "cro": this.state.cro,
        "project_type": this.state.projectCategory,
        "test_stage": this.state.testPeriod,
        "program_number": this.state.planCode,
        "research_product": this.state.researchProduct,
        "therapeutic_field": this.state.treatDomain,
        "screening_number": this.state.filterCount,
        "possibility": this.state.possibility,
        "is_bid": this.state.isArrangeBid,
        "remark": this.state.remark,
      },
      "projectBeforeOfferPmList": [],
      "planFiles": [],
      "researchCenterFiles": []
    })
  }

  update = () => {
    this.props.updateBeforeQuotation({
      "projectBeforeOffer": {
        "before_offer_id": this.props.beforeQuotationId,
        "project_info_id": this.props.projectId,
        "indication": this.state.indication,
        "service_type": this.state.serviceType.join(','),
        "center_number": this.state.centerNumber,
        "group_number": this.state.enrollmentCount,
        "group_stage": this.state.enrollmentPeriod,
        "bidders": this.state.bidParty,
        "cro": this.state.cro,
        "project_type": this.state.projectCategory,
        "test_stage": this.state.testPeriod,
        "program_number": this.state.planCode,
        "research_product": this.state.researchProduct,
        "therapeutic_field": this.state.treatDomain,
        "screening_number": this.state.filterCount,
        "possibility": this.state.possibility,
        "is_bid": this.state.isArrangeBid,
        "remark": this.state.remark,
      },
      "projectBeforeOfferPmList": []
    })
  }

  componentWillMount() {
    if (this.props.initBeforeQuotation) {
      this.setState(this.props.initBeforeQuotation)
    }
  }

  render() {
    return (
      <Form onValidChange={valid => this.setState({valid})}>
        <LabelAndInput
          label="适应症" inputType={NECESSARY}
          required={true} name="indication"
          value={this.state.indication} onChange={v => this.setState({indication: v})}
        />
        <LabelAndInput1 label="服务类别" inputType={NECESSARY}>
          <CheckGroup
            required={true} name="serviceType"
            options={SERVICE_TYPE} value={this.state.serviceType} onChange={v => this.setState({serviceType: v})}/>
        </LabelAndInput1>
        <LabelAndInput
          label="中心数" inputType={NECESSARY}
          required={true} name="centerNumber"
          value={this.state.centerNumber} onChange={v => this.setState({centerNumber: v})}
        />
        <LabelAndInput
          name="enrollmentCount" label="入组例数" inputType={NECESSARY}
          required={true}
          value={this.state.enrollmentCount} onChange={v => this.setState({enrollmentCount: v})}
        />
        <LabelAndInput
          name="enrollmentPeriod" label="入组期" inputType={NECESSARY}
          required={true}
          value={this.state.enrollmentPeriod} onChange={v => this.setState({enrollmentPeriod: v})}
        />
        <div className="bb">
          <LabelAndInput
            name="bidParty" label="申办方" inputType={IMPORTANT}
            value={this.state.bidParty} onChange={v => this.setState({bidParty: v})}
          />
          <div className="tip">默认申办方为所关联客户</div>
        </div>
        <div className="bb">
          <LabelAndInput
            name="cro" label="CRO" inputType={IMPORTANT}
            value={this.state.cro} onChange={v => this.setState({cro: v})}
          />
          <div className="tip">如果关联客户的类别是CRO，则默认为客户</div>
        </div>

        <LabelAndInput1 className="bb" label="项目分类">
          <Radio.Group name="projectCategory" value={this.state.projectCategory} onChange={v => this.setState({projectCategory: v})}>
            <Radio value="1">药物</Radio>
            <Radio value="2">器械</Radio>
            <Radio value="3">试剂</Radio>
            <Radio value="4">非干预</Radio>
            <div className="pt5 mt5 bt">
              <Radio value="5">其它，请备注：</Radio>
              <Input
                width="200px" disabled={this.state.projectCategory != '5'}
                value={this.state.categoryRemark} onChange={v => this.setState({categoryRemark: v})}/>
            </div>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput name="testPeriod" label="试验分期" inputType={IMPORTANT}
                       value={this.state.testPeriod} onChange={v => this.setState({testPeriod: v})}
        />
        <LabelAndInput name="planCode" label="方案号" inputType={IMPORTANT}
                       value={this.state.planCode} onChange={v => this.setState({planCode: v})}
        />
        <LabelAndInput name="researchProduct" label="研究产品" inputType={IMPORTANT}
                       value={this.state.researchProduct} onChange={v => this.setState({researchProduct: v})}
        />
        <LabelAndInput name="treatDomain" label="治疗领域" inputType={IMPORTANT}
                       value={this.state.treatDomain} onChange={v => this.setState({treatDomain: v})}
        />
        <LabelAndInput name="filterCount" label="筛选例数" inputType={IMPORTANT}
                       value={this.state.filterCount} onChange={v => this.setState({filterCount: v})}
        />
        <LabelAndInput1 label="成单可能性">
          <Select1 width="200px" options={POSSIBILITY} value={this.state.possibility} onChange={v => this.setState({possibility: v})}/>
        </LabelAndInput1>
        <LabelAndInput1 label="是否安排竞标">
          <Radio.Group value={this.state.isArrangeBid} onChange={v => this.setState({isArrangeBid: v})}>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput label="竞标支持PM"
                       value={this.state.bidSupportPM} onChange={v => this.setState({bidSupportPM: v})}
        />
        <LabelAndInput1 label="备注">
          <TextArea
            value={this.state.remark} onChange={v => this.setState({remark: v})}
          />
        </LabelAndInput1>

        <LabelAndInput1 label="方案附件">
          <Button>上传</Button>
        </LabelAndInput1>

        <div className="bb">
          <LabelAndInput1 label="研究中心名单">
            <Button>上传</Button>
          </LabelAndInput1>
          <div className="tip">研究中心名单或整个含附件的往来邮件记录</div>
        </div>
        {
          this.props.beforeQuotationId && (
            <Update disabled={!this.state.valid} onClick={this.update}/>
          )
        }
        {
          !this.props.beforeQuotationId && (
            <Save disabled={!this.props.projectId || !this.state.valid} onClick={this.add}/>
          )
        }
      </Form>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    ...state.project,
    projectId: props.projectId,
    beforeQuotationId: props.beforeQuotationId,
    initBeforeQuotation: props.initBeforeQuotation
  }
}

export default connect(mapStateToProps, {
  addBeforeQuotation, updateBeforeQuotation
})(BeforeQuotation)
