import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import Book from './Book.js'
import messages from '../../auth/messages.js'

class Wishlist extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: []
    }
  }
  componentWillMount () {
    this.props.alert(messages.wishlistLoadSuccess, 'primary')
    axios({
      url: `${apiUrl}/wishlists`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        const fullList = res.data.wishlists
        const tempArray = []
        fullList.forEach(
          (book) => {
            axios({
              url: `${apiUrl}/books/${book.book}`,
              method: 'GET'
            })
              .then(res => {
                tempArray.push({ bookData: res.data.book, wishlistId: book._id })
                this.setState({ books: tempArray })
              })
          }
        )
      })
      .catch(error => {
        this.props.alert(messages.genericError, 'danger')
        console.error(error)
      })
  }
  render () {
    const { books } = this.state
    const { user, match } = this.props
    return (
      <div>
        {books.length > 0 && books.map(book => (
          <Book key={book.book} match={match} user={user} book={book.bookData} wishlistId={book.wishlistId}/>
        ))}
      </div>
    )
  }
}

export default Wishlist
