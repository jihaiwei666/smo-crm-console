/**
 * Created by jiangyukun on 2017/7/4.
 */

import {_get, _post, _patch} from "../../core/http"
import {THREE_PHASE} from '../../middlewares/request_3_phase'
import {ACCOUNT_MANAGE} from '../../core/constants/types'

const prefix = '/user'

export function fetchList(start) {
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.FETCH_LIST,
      http: () => _get(prefix + `/v1/getUserList/${start}`),
      handleResponse: data => ({count: data['totalCount'], list: data['list']})
    }
  }
}

export function addAccount(email, username, shortName, position) {
  const options = {
    "user_account": email,
    "user_name": username,
    "user_short_name": shortName,
    "user_post_type": position,
  }
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.ADD_ACCOUNT,
      http: () => _post(prefix + `/v1/addUser`, {body: options})
    }
  }
}

export function disableAccount(id) {
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.DISABLE_ACCOUNT,
      http: () => _patch(prefix + `/v1/disabledUser/${id}`)
    }
  }
}

export function resetPassword(id) {
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.RESET_PASSWORD,
      http: () => _patch(prefix + `/v1/restPassword/${id}`)
    }
  }
}

export function updateAccount(id, email, username, shortName, position) {
  const options = {
    "user_id": id,
    "user_account": email,
    "user_name": username,
    "user_short_name": shortName,
    "user_post_type": position,
  }
  return {
    [THREE_PHASE]: {
      type: ACCOUNT_MANAGE.UPDATE_ACCOUNT,
      http: () => _post(prefix + `/v1/updateUser`, {body: options})
    }
  }
}
