/**
 * Created by jiangyukun on 2017/7/5.
 */
import React from 'react'

export default function load(callback) {
  require.ensure([], require => {
    const Clients = require('../../2-clients/Clients')
    callback(Clients)
  })
}