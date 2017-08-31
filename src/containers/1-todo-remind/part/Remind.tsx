/**
 * Created by jiangyukun on 2017/8/24.
 */
import React from 'react'
import {Row, Part} from 'app-core/layout/'
import ScrollContainer from 'app-core/core/ScrollContainer'

import {getRelevantTypeText} from '../todo-remind.helper'
import RemindStatus from './RemindStatus'
import DownloadFile from '../../../components/file/DownloadFile'

interface RemindProps {
  fromOrTo: string
  remindList: any[]
  loadMore: (start) => void
  updateStatus: (remindId, status) => void
}

class Remind extends React.Component<RemindProps> {
  state = {
    start: 0
  }

  loadMore = () => {
    this.props.loadMore(this.state.start)
  }

  render() {
    return (
      <ScrollContainer className="todo-remind-list" onScrollBottom={() => this.setState({start: this.state.start + 1}, this.loadMore)}>
        {
          this.props.remindList.map((item, index) => {
            return (
              <Row key={item.id} className="todo-remind-item">
                <Part className="m10">
                  <div>
                    {
                      this.props.fromOrTo == 'to' && (
                        <span>
                          <span className="mr7">{item.from}</span>
                          <span className="send-text">发来：</span>
                        </span>
                      )
                    }
                    {
                      this.props.fromOrTo == 'from' && (
                        <span>
                          <span className="send-text">发给：</span>
                          {item.to}
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
                      <span className="relevant-type-name">{item['name']}</span>
                    </div>
                    {
                      item.attachments.length != 0 && (
                        <div className="remind-attachment">
                          <span className="remind-attachment-text">附件:</span>
                          {
                            item.attachments.map(attachment => {
                              return (
                                <DownloadFile key={attachment.id} url={attachment.url} className="mr7">
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
                    <RemindStatus
                      remind={item}
                      updateStatus={this.props.updateStatus}
                    />
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
