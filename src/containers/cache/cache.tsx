/**
 * Created by jiangyukun on 2017/7/12.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default function cache(Component) {
  class CacheComponent extends React.Component<any> {
    static contextTypes = {
      store: PropTypes.any
    }

    fetchBD = () => {
      const state = this.context.store.getState()
      if (!state.BDList.loaded) {
        this.props.fetchBD()
      }
    }

    fetchBDPC = () => {
      const state = this.context.store.getState()
      if (!state.BDPCList.loaded) {
        this.props.fetchBDPC()
      }
    }

    render() {
      let cache: any = {}
      if (this.props.fetchBD) {
        cache.fetchBD = this.fetchBD
      }
      if (this.props.fetchBDPC) {
        cache.fetchBDPC = this.fetchBDPC
      }
      return (
        <Component
          {...this.props}
          {...cache}
        />
      )
    }
  }

  return CacheComponent
}
