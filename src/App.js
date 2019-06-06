// EXTERNAL IMPORTS
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'

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

  // getBooks = () => {
  //   console.log('You clicked a button!')
  // }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
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
            <GetBooks user={user}/>
          )} />
          <AuthenticatedRoute user={user} path='/wishlists' render={() => (
            <Wishlist user={user}/>
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
