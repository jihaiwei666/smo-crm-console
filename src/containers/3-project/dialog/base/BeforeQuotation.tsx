/**
 * 报价前
 * Created by jiangyukun on 2017/7/27.
 */
import React from 'react'

import {NECESSARY, IMPORTANT} from '../../../common/Label'
import LabelAndInput from '../../../common/LabelAndInput'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import CheckGroup from '../../../../components/form/checkgroup/CheckGroup'
import {PROJECT_CATEGORY} from '../../project.constant'
import Input from '../../../../components/form/Input'
import Select1 from 'app-core/common/Select1'
import Radio from '../../../../components/form/radio/Radio'
import TextArea from 'app-core/form/TextArea'
import Button from '../../../../components/button/Button'
import Save from '../../../common/Save'

interface BeforeQuotationProps {

}

class BeforeQuotation extends React.Component<BeforeQuotationProps> {
  state = {
    projectName: '',
    categoryList: [],
    isArrangeBid: null
  }

  render() {
    return (
      <div>
        <LabelAndInput label="适应症" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="服务类别" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="中心数" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="入组例数" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="入组期" inputType={NECESSARY}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <div className="bb">
          <LabelAndInput label="申办方" inputType={IMPORTANT}
                         value={this.state.projectName} onChange={v => this.setState({projectName: v})}
          />
          <div className="tip">默认申办方为所关联客户</div>
        </div>
        <div className="bb">
          <LabelAndInput label="CRO" inputType={IMPORTANT}
                         value={this.state.projectName} onChange={v => this.setState({projectName: v})}
          />
          <div className="tip">如果关联客户的类别是CRO，则默认为客户</div>
        </div>

        <LabelAndInput1 label="项目分类">
          <CheckGroup options={PROJECT_CATEGORY} value={this.state.categoryList} onChange={v => this.setState({categoryList: v})}/>
          <Input/>
        </LabelAndInput1>

        <LabelAndInput label="试验分期" inputType={IMPORTANT}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="方案号" inputType={IMPORTANT}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="研究产品" inputType={IMPORTANT}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="治疗领域" inputType={IMPORTANT}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput label="筛选例数" inputType={IMPORTANT}
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput1 label="成单可能性">
          <Select1/>
        </LabelAndInput1>
        <LabelAndInput1 label="是否安排竞标">
          <Radio.Group value={this.state.isArrangeBid}>
            <Radio value="1">是</Radio>
            <Radio value="2">否</Radio>
          </Radio.Group>
        </LabelAndInput1>

        <LabelAndInput label="竞标支持PM"
                       value={this.state.projectName} onChange={v => this.setState({projectName: v})}
        />
        <LabelAndInput1 label="备注">
          <TextArea/>
        </LabelAndInput1>

        <LabelAndInput1 label="备注">
          <Button>上传</Button>
        </LabelAndInput1>

        <div className="bb">
          <LabelAndInput1 label="研究中心名单">
            <Button>上传</Button>
          </LabelAndInput1>
          <div className="tip">研究中心名单或整个含附件的往来邮件记录</div>
        </div>

        <Save/>
      </div>
    )
  }
}

export default BeforeQuotation
