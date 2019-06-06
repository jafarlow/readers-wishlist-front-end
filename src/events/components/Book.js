
import React, { Component } from 'react'
// import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Book extends Component {
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
  // read/not read button on each book
  render () {
    const { book } = this.props

    if (!book) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <h4>{book.title}</h4>
        <p>Author: {book.author}</p>
        <p>Publication year: {book.publicationYear}</p>
        <p>Genre: {book.genre}</p>
        <p>Page count: {book.pageCount}</p>
        <button onClick={this.addToList}>Add to list</button>
      </div>
    )
  }
}

export default Book
