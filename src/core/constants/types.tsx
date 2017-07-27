function getActionTypeFn(prefix) {
  return function (type) {
    return prefix + '__' + type
  }
}

function generatorValueFromKey(prefix: string, obj: object): void {
  let typeFn = getActionTypeFn(prefix)
  Object.keys(obj).forEach(key => obj[key] = typeFn(key))
}

export const APP = {
  FETCH_BD: null,
  FETCH_BDPC: null,
}

export const TODO_REMIND = {
  FETCH_LIST: null,
  FETCH_USER_CATEGORY_INFO: null,

}

export const CLIENTS = {
  FETCH_LIST: null,
  FETCH_BD_LIST: null,
  ADD_CUSTOMER: null,
  UPDATE_CUSTOMER: null,
  FETCH_CUSTOMER_INFO: null,
  UPDATE_BD_AND_BDPC: null,

  ADD_SUB_COMPANY: null,
  UPDATE_SUB_COMPANY: null,
  REMOVE_SUB_COMPANY: null,

  ADD_CONTACT: null,
  UPDATE_CONTACT: null,
  REMOVE_CONTACT: null,

  FETCH_CDA_LIST: null,
  FETCH_CDA_DETAIL: null,
  ADD_CDA: null,
  UPDATE_CDA: null,
  REMOVE_CDA: null,
  FETCH_PROJECT_LIST: null,
  FETCH_CONTACT_LIST: null,

  ADD_SUPPLIER: null,
  UPDATE_SUPPLIER: null,
  FETCH_MSA_LIST: null,
  ADD_MSA: null,
  UPDATE_MSA: null,

  ADD_RFI: null,
  UPDATE_RFI: null,
  REMOVE_RFI: null,

  FETCH_VISIT_RECORD_LIST: null,
  ADD_VISIT_RECORD: null,
  UPDATE_VISIT_RECORD: null,
  REMOVE_VISIT_RECORD: null,
}

export const PROJECT = {
  FETCH_LIST: null,
  FETCH_DETAIL: null,
  UPDATE_BD_AND_BDPC: null,
  FETCH_CLIENT_LIST: null,
  ADD_PROJECT_INFO: null,

}

export const CONTRACT = {
  FETCH_LIST: null,
  FETCH_DETAIL: null,
  ADD: null,
  UPDATE: null,
  DELETE: null,
}

export const RECYCLE_BIN = {
  FETCH_LIST: null,
  FETCH_DETAIL: null,
}

export const ACCOUNT_MANAGE = {
  FETCH_LIST: null,
  ADD_ACCOUNT: null,
  UPDATE_ACCOUNT: null,
  DISABLE_ACCOUNT: null,
  RESET_PASSWORD: null,
}

generatorValueFromKey('APP', APP)
generatorValueFromKey('PROJECT', PROJECT)
generatorValueFromKey('CLIENTS', CLIENTS)
generatorValueFromKey('CONTRACT', CONTRACT)

generatorValueFromKey('ACCOUNT_MANAGE', ACCOUNT_MANAGE)
