/**
 * Created by jiangyukun on 2017/7/7.
 */
import React from 'react'
import Modal from 'app-core/modal'
import Select1 from 'app-core/common/Select1'
import Spinner from 'app-core/common/Spinner'
import FullDialogContent from 'app-core/common/content/FullDialogContent'
import ConfirmOrClose from 'app-core/common/ConfirmOrClose'
import {category} from '../todo-remind.constant'
import Button from '../../../components/button/Button'
import Input from '../../../components/form/Input'
import Data from '../../common/interface/Data'
import Radio from '../../../components/form/radio/Radio'

interface RelevantItemDialogProps {
  fetchRelevantItemList: (category: string, searchKey: string) => void
  relevantItemList: Data<any[]>
  onSelect: (value, text) => void
  onExited: () => void
}

class RelevantItemDialog extends React.Component<RelevantItemDialogProps> {
  state = {
    show: true,
    category: '1',
    searchKey: '',
    relevantItem: ''
  }

  close = () => {
    this.setState({show: false})
  }

  onSelect = () => {
    let item = this.props.relevantItemList.data.find(d => d.id == this.state.relevantItem)
    let text = item.name
    this.props.onSelect(this.state.relevantItem, text)
    this.close()
  }

  refreshList = () => {
    this.props.fetchRelevantItemList(this.state.category, this.state.searchKey)
  }

  componentDidMount() {
    this.refreshList()
  }

  render() {
    const {loaded, data} = this.props.relevantItemList
    return (
      <Modal style={{width: '450px'}}
             show={this.state.show} onHide={this.close} onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>插入关联项</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="search-box">
            <div className="choice-category">
              <Select1
                className="relevant-item-category"
                placeholder="关联项分类"
                options={category}
                value={this.state.category}
                onChange={v => this.setState({category: v}, this.refreshList)}
              />
            </div>
            <div className="flex1">
              <Input value={this.state.searchKey} onChange={v => this.setState({searchKey: v})}/>
            </div>
            <div className="pl5">
              <Button className="small" onClick={this.refreshList}>搜索</Button>
            </div>
          </div>
          <div className="relevant-item-list">
            {
              !loaded && (
                <Spinner/>
              )
            }
            {
              loaded && (
                <Radio.Group value={this.state.relevantItem} onChange={v => this.setState({relevantItem: v})}>
                  {
                    data.map(item => {
                      return (
                        <div key={item.id} className="m10">
                          <Radio value={item.id}>{item.name}</Radio>
                        </div>
                      )
                    })
                  }
                </Radio.Group>
              )
            }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <ConfirmOrClose onCancel={this.close} onConfirm={this.onSelect} disabled={!this.state.relevantItem}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default RelevantItemDialog
