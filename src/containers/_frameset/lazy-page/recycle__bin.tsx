/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'

export default function load(callback) {
  require.ensure([], require => {
    const RecycleBin = require('../../6-recycle-bin/RecycleBin')
    callback(RecycleBin)
  }, 'recycle_bin')
}
