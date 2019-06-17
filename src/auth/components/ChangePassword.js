import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (
      <form className='auth-form' onSubmit={this.onChangePassword}>
        <h3>Change Password</h3>

        <label className="sr-only" htmlFor="oldpw">Old Password</label>
        <input
          required
          name="oldPassword"
          value={oldPassword}
          type="password"
          placeholder="Old Password"
          className="placeholder-text"
          onChange={this.handleChange}
        />
        <label className="sr-only" htmlFor="newPassword">New Password</label>
        <input
          required
          name="newPassword"
          value={newPassword}
          type="password"
          placeholder="New Password"
          className="placeholder-text"
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-warning">Change Password</button>
      </form>
    )
  }
}

export default withRouter(ChangePassword)
