
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from '../../auth/messages.js'

class Book extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false,
      read: ''
    }
  }
  componentDidMount () {
    if (location.hash === '#/wishlists') {
      axios({
        url: `${apiUrl}/wishlists/${this.props.wishlistId}`,
        method: 'GET',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        }
      })
      // .then(res => console.log(res))
        .then((res) => this.setState({ read: res.data.wishlist.read }))
        .catch(console.error)
    }
  }
  addToList = () => {
    this.btn.setAttribute('disabled', 'disabled')
    axios({
      url: `${apiUrl}/wishlists`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        wishlist: {
          book: this.props.book._id
        }
      }
    })
  }
  destroy = () => {
    axios({
      url: `${apiUrl}/wishlists/${this.props.wishlistId}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(error => {
        console.error(error)
        this.props.alert(messages.deleteBookFailure, 'danger')
      })
  }
  markAsRead = () => {
    axios({
      url: `${apiUrl}/wishlists/${this.props.wishlistId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        wishlist: {
          read: true
        }
      }
    })
      .then(() => this.setState({ read: true }))
      .then(() => <Redirect to={
        { pathname: '/wishlists' }
      } />)
      .catch(error => {
        console.error(error)
        this.props.alert(messages.genericError, 'danger')
      })
  }
  markAsUnread = () => {
    axios({
      url: `${apiUrl}/wishlists/${this.props.wishlistId}`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        wishlist: {
          read: false
        }
      }
    })
      .then(() => this.setState({ read: false }))
      .then(() => <Redirect to={
        { pathname: '/wishlists' }
      } />)
      .catch(error => {
        console.error(error)
        this.props.alert(messages.genericError, 'danger')
      })
  }
  render () {
    const { book } = this.props
    const { deleted, read } = this.state
    const currentLocation = location.hash
    let addToListButton
    let deleteButton
    let readButton

    if (!book) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/wishlists' }
      } />
    }

    if (currentLocation === '#/wishlists') {
      deleteButton = <button onClick={this.destroy}>Remove book</button>
      readButton = <div>{read ? (
        <button onClick={this.markAsUnread}>Mark as Unread</button>
      ) : (
        <button onClick={this.markAsRead}>Mark as Read</button>
      )}</div>
    }
    if (currentLocation === '#/books') {
      addToListButton = <button ref={btn => { this.btn = btn } } onClick={this.addToList}>Add to list</button>
    }

    return (
      <div>
        <h4>{book.title}</h4>
        <p>Author: {book.author}</p>
        <p>Publication year: {book.publicationYear}</p>
        <p>Genre: {book.genre}</p>
        <p>Page count: {book.pageCount}</p>
        <div>{addToListButton}</div>
        <div>{readButton}</div>
        <div>{deleteButton}</div>
      </div>
    )
  }
}

export default Book
