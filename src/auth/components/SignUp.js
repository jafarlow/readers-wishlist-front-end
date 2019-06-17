import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>

        <label className="sr-only" htmlFor="email">Register with a fake email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
          placeholder="Register with a fake email"
          className="placeholder-text"
          onChange={this.handleChange}
        />
        <label className="sr-only" htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          className="placeholder-text"
          onChange={this.handleChange}
        />
        <label className="sr-only" htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          className="placeholder-text"
          onChange={this.handleChange}
        />
        <button type="submit" className="btn btn-success">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
