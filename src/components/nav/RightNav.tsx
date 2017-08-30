/**
 * Created by jiangyukun on 2017/8/30.
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {findDOMNode} from 'react-dom'
import {Row, Part} from 'app-core/layout/'

interface RightNavProps {
  navItems: string[]
}

class RightNav extends React.Component<RightNavProps> {
  static childContextTypes = {
    addNavTitle: PropTypes.func
  }

  _container: React.ReactInstance

  navTitles = []
  heightList = []
  state = {
    active: -1
  }

  addNavTitle = (navTitle) => {
    this.navTitles.push(navTitle)
  }

  handleScroll = () => {
    this.showActive()
  }

  calculateTitleHeight = () => {
    this.heightList = []
    this.navTitles.forEach((title, index) => {
      this.heightList.push(findDOMNode<HTMLDivElement>(title).offsetTop - 60)
    })
  }

  showActive() {
    const top = findDOMNode<HTMLDivElement>(this._container).scrollTop
    for (let i = 0; i < this.heightList.length; i++) {
      if (this.heightList[i] >= top) {
        this.setState({active: i})
        break
      }
    }
  }

  scrollToTitle = (index) => {
    let container = findDOMNode<HTMLDivElement>(this._container)
    container.scrollTop = this.heightList[index]
  }

  componentDidMount() {
    this.calculateTitleHeight()
    this.showActive()
  }

  componentDidUpdate() {
    this.calculateTitleHeight()
  }

  render() {
    return (
      <Row className="body-box">
        <Part className="form-container" ref={c => this._container = c} onScroll={this.handleScroll}>
          {this.props.children}
        </Part>
        <div className="customer-nav">
          <ul className="nav-category-group">
            {
              this.props.navItems.map((item, index) => {
                return (
                  <li key={index}
                      className={classnames({'active': this.state.active == index})}
                      onClick={() => this.scrollToTitle(index)}
                  >
                    {item}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </Row>
    )
  }

  getChildContext() {
    return {
      addNavTitle: this.addNavTitle
    }
  }
}

export default RightNav
