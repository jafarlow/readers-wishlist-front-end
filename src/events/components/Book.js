
import React, { Component } from 'react'
// import { Link, Redirect } from 'react-router-dom'
// import axios from 'axios'

// import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Book extends Component {
  destroy = () => {
    console.log('destroyed')
  }

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
        <button onClick={this.destroy}>Delete Book</button>
      </div>
    )
  }
}

export default Book
