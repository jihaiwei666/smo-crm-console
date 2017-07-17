/**
 * Created by jiangyukun on 2017/7/10.
 */
import React from 'react'
import {FlexDiv, Part} from 'app-core/layout'
import Button from '../../../../components/button/Button'
import LabelAndInput from '../../../common/LabelAndInput'
import InputGroup, {NECESSARY, IMPORTANT} from '../../../common/InputGroup'
import LabelAndInput1 from '../../../common/LabelAndInput1'
import Radio from '../../../../components/form/radio/Radio'
import TextAndButton from '../../../common/TextAndButton'
import AddButton from '../../../common/AddButton'
import Save from '../../../common/Save'
import {addListItem} from '../../../../core/utils/arrayUtils'

interface SupplierProps {
}

let id = 1

function getNextBroker() {
  return {
    id: id++,
    broker: '',
    telephone: '',
    email: '',
    position: ''
  }
}

function getNextSupplier() {
  return {
    id: id++,
    startDate: '',
    endDate: '',
    chosenDate: '',
    isFixed: '',
    unitPrice: '',
    brokerList: [getNextBroker()]
  }
}

class Supplier extends React.Component<SupplierProps> {
  state = {
    supplierType: '',
    supplierList: [getNextSupplier()]
  }

  addSupplier = () => {
    this.setState({supplierList: addListItem(this.state.supplierList, getNextSupplier())})
  }

  addBroker = (supplierIndex) => {
    addListItem(this.state.supplierList[supplierIndex].brokerList, getNextBroker())
    this.forceUpdate()
  }

  handleSupplierChange = (supplierIndex, stateKey, value) => {
    this.state.supplierList[supplierIndex][stateKey] = value
    this.forceUpdate()
  }

  handleBrokerChange = (supplierIndex, brokerIndex, stateKey, value) => {
    this.state.supplierList[supplierIndex].brokerList[brokerIndex][stateKey] = value
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <InputGroup label="供应商类别" inputType={NECESSARY}>
          <Radio.Group value={this.state.supplierType} onChange={v => this.setState({supplierType: v})}>
            <Radio value="1">优选供应商</Radio>
            <Radio value="2">普通供应商</Radio>
          </Radio.Group>
        </InputGroup>
        <div className="mt15 pb15 pl5 bb">供应商信息：</div>
        <div className="bb">
          {
            this.state.supplierList.map((supplier, supplierIndex) => {
              return (
                <FlexDiv key={supplier.id}>
                  <div style={{width: '30px'}}></div>
                  <Part className="bl bb">
                    <InputGroup label="有效期限（!）">
                      <LabelAndInput
                        label="起始日期"
                        value={supplier.startDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'startDate', v)}
                      />
                      <LabelAndInput
                        label="结束日期"
                        value={supplier.endDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'endDate', v)}
                      />
                      <LabelAndInput
                        label="入选时间"
                        value={supplier.chosenDate}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'chosenDate', v)}
                      />
                      <LabelAndInput1 label="是否固定">
                        <Radio.Group value={supplier.isFixed} onChange={v => this.handleSupplierChange(supplierIndex, 'isFixed', v)}>
                          <Radio value="1">是</Radio>
                          <Radio value="2">否</Radio>
                        </Radio.Group>
                      </LabelAndInput1>
                      <LabelAndInput
                        label="具体单价"
                        value={supplier.unitPrice}
                        onChange={v => this.handleSupplierChange(supplierIndex, 'unitPrice', v)}
                      />
                    </InputGroup>
                    <InputGroup label="对接人信息" inputType={IMPORTANT}>
                      {
                        supplier.brokerList.map((broker, brokerIndex) => {
                          return (
                            <div key={broker.id} className="bb p5">
                              <LabelAndInput
                                label="对接人"
                                value={broker.broker}
                                onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'broker', v)}
                              />
                              <LabelAndInput
                                label="电话"
                                value={broker.telephone}
                                onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'telephone', v)}
                              />
                              <LabelAndInput
                                label="邮箱"
                                value={broker.email}
                                onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'email', v)}
                              />
                              <LabelAndInput
                                label="职位"
                                value={broker.position}
                                onChange={v => this.handleBrokerChange(supplierIndex, brokerIndex, 'position', v)}
                              />
                            </div>
                          )
                        })
                      }
                      <TextAndButton text="请先完善联系人信息，之后才能选择该联系人">
                        <AddButton onClick={() => this.addBroker(supplierIndex)}/>
                      </TextAndButton>
                    </InputGroup>
                    <Save/>
                  </Part>
                </FlexDiv>
              )
            })
          }
          <div>
            <TextAndButton text="点此添加按钮添加一条供应商信息">
              <AddButton onClick={this.addSupplier}/>
            </TextAndButton>
          </div>
        </div>

        <LabelAndInput label="MSA（*）" className="pt5 pb5 bb"/>
        <InputGroup label="">
          <LabelAndInput label="起始日期"/>
          <LabelAndInput label="结束日期"/>
          <LabelAndInput1 label="MSA扫描件">
            <Button className="small">上传</Button>
          </LabelAndInput1>
        </InputGroup>

        <TextAndButton text="只显示最近一条MSA信息，更多请点击查看更多按钮查看">
          <Button className="small">...查看更多</Button>
        </TextAndButton>
        <Save/>
      </div>
    )
  }
}

export default Supplier
