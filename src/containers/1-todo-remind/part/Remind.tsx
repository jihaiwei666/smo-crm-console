/**
 * Created by jiangyukun on 2017/8/24.
 */
import React from 'react'
import {Row, Part} from 'app-core/layout/'
import ScrollContainer from 'app-core/core/ScrollContainer'

import {getRelevantTypeText} from '../todo-remind.helper'
import RemindStatus from './RemindStatus'

interface RemindProps {
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
                    {item['email']}
                    <span className="send-text">发来：</span>
                    <div className="pull-right">
                      {item.sendTime}
                    </div>
                  </div>
                  <div className="content">
                    {item['content']}
                  </div>
                  <div>
                    <span className="relevant-item">关联项：</span>
                    <span className="relevant-type">
                        {getRelevantTypeText(item.relevantType)}
                      </span>
                    <span className="relevant-type-name">{item['name']}</span>
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
