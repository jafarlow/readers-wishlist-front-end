// EXTERNAL IMPORTS
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// LOCAL IMPORTS
import './App.scss'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute.js'
import Header from './header/Header.js'
import SignUp from './auth/components/SignUp.js'
import SignIn from './auth/components/SignIn.js'
import SignOut from './auth/components/SignOut.js'
import ChangePassword from './auth/components/ChangePassword.js'
import GetBooks from './events/components/GetBooks.js'
import Wishlist from './events/components/Wishlist.js'
import AutoDismissAlert from './events/components/AutoDismissAlert.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            alert={alert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books' render={() => (
            <GetBooks alert={this.alert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/wishlists' render={({ match }) => (
            <Wishlist alert={this.alert} match={match} user={user}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
