/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'

export default function load(callback) {
  require.ensure([], require => {
    const AccountManage = require('../../7-account-manage/AccountManage')
    callback(AccountManage)
  }, 'account_manage')
}
