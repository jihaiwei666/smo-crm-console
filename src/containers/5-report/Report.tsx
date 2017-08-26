/**
 * Created by jiangyukun on 2017/8/10.
 */
import React from 'react'

interface ReportProps {

}

class Report extends React.Component<ReportProps> {
  id: any
  state = {
    v: ''
  }

  render() {
    let list = [
      '客户信息汇总表', '合同汇总表', '报价汇总表',
      '收款汇总表', '项目交接表', 'CDA汇总表', 'RFI汇总表'
    ]

    return (
      <div className="app-function-page report">
        <div className="report-list">
          {
            list.map((item, index) => {
              return (
                <div key={index} className="report-item">
                  {item}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Report
