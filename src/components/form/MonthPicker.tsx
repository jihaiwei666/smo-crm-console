/**
 * Created by jiangyukun on 2017/8/7.
 */
import React from 'react'
import AntdDatePicker, {DatePickerProps as AntdProps} from 'antd/lib/date-picker'
import addFormSupport from 'app-core/core/hoc/addFormSupport'

interface DatePickerProps extends AntdProps {
  required?: boolean
  name?: string
}

const AntdMonthPicker = AntdDatePicker.MonthPicker

class MonthPicker extends React.Component<DatePickerProps> {
  render() {
    return (
      <AntdMonthPicker {...this.props}/>
    )
  }
}

export default addFormSupport(MonthPicker, ({props}) => props.value != null)
