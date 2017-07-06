/**
 * Created by jiangyukun on 2017/7/6.
 */
interface AppFunctionPage {
  fetchList: any

  showMessage: (msg: any) => void
  showSuccess: (content: string) => void
  clearState: (type: string) => void
}

export default AppFunctionPage
