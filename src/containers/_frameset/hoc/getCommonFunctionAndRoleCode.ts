/**
 * Created by jiangyukun on 2017/9/7.
 */
import getRoleCode from '../getRoleCode'
import addCommonFunction from '../addCommonFunction'

export default function getCommonFunctionAndRoleCode(Component) {
  return getRoleCode(addCommonFunction(Component))
}
