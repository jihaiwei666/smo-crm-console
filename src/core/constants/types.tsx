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

}

export const CLIENTS = {
  FETCH_LIST: null,
  FETCH_BD_LIST: null,
  ADD_CUSTOMER: null,
  UPDATE_CUSTOMER: null,
  FETCH_CUSTOMER_INFO: null,
}

export const PROJECT = {
  FETCH_LIST: null,
  FETCH_DETAIL: null,
  ADD: null,
  UPDATE: null,
  DELETE: null,
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

generatorValueFromKey('ACCOUNT_MANAGE', ACCOUNT_MANAGE)
