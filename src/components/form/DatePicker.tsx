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

class DatePicker extends React.Component<DatePickerProps> {
  render() {
    return (
      <AntdDatePicker {...this.props}/>
    )
  }
}

export default addFormSupport(DatePicker, ({props}) => props.value != null)
