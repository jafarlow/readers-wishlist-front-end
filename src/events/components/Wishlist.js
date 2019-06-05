import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import Book from './Book.js'

class Wishlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount () {
    axios(`${apiUrl}/wishlist`)
      .then(res => this.setState({ book: res.data.book }))
      .catch(console.error)
  }
  render () {
    const { books } = this.state
    return (
      <div>
        {books.length > 0 && books.map(book => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    )
  }
}

export default Wishlist
