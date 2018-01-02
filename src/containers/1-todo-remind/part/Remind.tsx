/**
 * Created by jiangyukun on 2017/8/24.
 */
import React from 'react'
import {Row, Part} from 'app-core/layout/'
import ScrollContainer from 'app-core/core/ScrollContainer'

import DownloadFile from '../../../components/file/DownloadFile'
import RemindStatusTo from './RemindStatusTo'
import RemindStatusFrom from './RemindStatusFrom'
import UpdateCustomerDialog from '../../2-customer/dialog/UpdateCustomerDialog'
import UpdateProjectDialog from '../../3-project/dialog/UpdateProjectDialog'
import UpdateContractDialog from '../../4-contract/dialog/UpdateContractDialog'

import {getRelevantTypeText} from '../todo-remind.helper'
import {getNameAndEmail} from '../../common/common.helper'

interface RemindProps {
  fromOrTo: string
  remindList: any[]
  loadMore: (start) => void
  updateStatus: (remindId, status) => void
}

class Remind extends React.Component<RemindProps> {
  state = {
    start: 0,
    relevantId: '',
    relevantType: ''
  }

  loadMore = () => {
    this.props.loadMore(this.state.start)
  }

  render() {
    return (
      <ScrollContainer className="todo-remind-list" onScrollBottom={() => this.setState({start: this.state.start + 1}, this.loadMore)}>
        {
          this.state.relevantType == '1' && this.state.relevantId && (
            <UpdateCustomerDialog
              customerId={this.state.relevantId}
              onExited={() => this.setState({relevantId: ''})}
            />
          )
        }
        {
          this.state.relevantType == '2' && this.state.relevantId && (
            <UpdateProjectDialog
              projectId={this.state.relevantId}
              onExited={() => this.setState({relevantId: ''})}
            />
          )
        }
        {
          this.state.relevantType == '3' && this.state.relevantId && (
            <UpdateContractDialog
              contractId={this.state.relevantId}
              onExited={() => this.setState({relevantId: ''})}
            />
          )
        }
        {
          this.props.remindList.map((item, index) => {
            return (
              <Row key={item.id} className="todo-remind-item">
                <Part className="m10">
                  <div>
                    {
                      this.props.fromOrTo == 'to' && (
                        <span>
                          <span className="mr7">{getNameAndEmail(item.fromName, item.from)}</span>
                          <span className="send-text">发来：</span>
                        </span>
                      )
                    }
                    {
                      this.props.fromOrTo == 'from' && (
                        <span>
                          <span className="send-text">发给：</span>
                          {getNameAndEmail(item.toName, item.to)}
                          </span>
                      )
                    }

                    <div className="pull-right">
                      {item.sendTime}
                    </div>
                  </div>
                  <div className="content">
                    {item['content']}
                  </div>
                  <div>
                    <div className="relevant-item">
                      <span className="relevant-item-text">关联项：</span>
                      <span className="relevant-type">
                        {getRelevantTypeText(item.relevantType)}
                      </span>
                      {
                        item.relevantRemoved && (
                          <span className="relevant-type-name removed" title="此关联项已删除">
                            {item['name']}
                          </span>
                        )
                      }
                      {
                        !item.relevantRemoved && (
                          <span className="relevant-type-name" onClick={() => this.setState({relevantId: item.relevantId, relevantType: item.relevantType})}>
                            {item['name']}
                          </span>
                        )
                      }
                    </div>
                    {
                      item.attachments.length != 0 && (
                        <div className="remind-attachment">
                          <span className="remind-attachment-text">附件:</span>
                          {
                            item.attachments.map(attachment => {
                              return (
                                <DownloadFile key={attachment.id} url={attachment.url} className="mr7" downloadName={attachment.name}>
                                  [{attachment.name}]
                                </DownloadFile>
                              )
                            })
                          }
                        </div>
                      )
                    }
                  </div>
                </Part>
                <div className="todo-remind-status">
                  <Row className="h-100 h-middle v-middle">
                    {
                      this.props.fromOrTo == 'to' && (
                        <RemindStatusTo
                          remind={item}
                          updateStatus={this.props.updateStatus}
                        />
                      )
                    }
                    {
                      this.props.fromOrTo == 'from' && (
                        <RemindStatusFrom
                          remind={item}
                          updateStatus={this.props.updateStatus}
                        />
                      )
                    }
                  </Row>
                </div>
              </Row>
            )
          })
        }
      </ScrollContainer>
    )
  }
}

export default Remind
