
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import messages from '../../auth/messages.js'

// import Layout from '../shared/Layout'

class Book extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false,
      read: false
    }
  }
  // componentDidMount () {
  //   axios({
  //     url: `${apiUrl}/wishlists/${this.props.wishlistId}`,
  //     method: 'GET',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //   })
  //     // .then(res => console.log(res))
  //     .then((res) => this.setState({ read: res.data.wishlist.read }))
  //     .catch(console.error)
  // }
  addToList = () => {
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
        this.props.alert(messages.deleteBookFailure, 'danger')
        console.error(error)
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
          book: this.props.book._id
        }
      }
    })
      .then(() => this.setState({ read: true }))
      .catch(error => {
        this.props.alert(messages.genericError, 'danger')
        console.error(error)
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
          book: this.props.book._id
        }
      }
    })
      .then(() => this.setState({ read: false }))
      .catch(error => {
        this.props.alert(messages.genericError, 'danger')
        console.error(error)
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
        { pathname: '/wishlists', state: { msg: 'Book successfully deleted' } }
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
      addToListButton = <button onClick={this.addToList}>Add to list</button>
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
