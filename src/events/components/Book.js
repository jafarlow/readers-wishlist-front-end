
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Book extends Component {
  constructor (props) {
    super(props)

    this.state = {
      deleted: false
    }
  }
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
      url: `${apiUrl}/wishlists/${this.props.match.params.id}`,
      method: 'DELETE'
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }
  render () {
    const { book } = this.props
    const { deleted } = this.state
    const currentLocation = location.hash
    let addToListButton
    let deleteButton

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
        <div>{deleteButton}</div>
      </div>
    )
  }
}

export default Book
