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
  componentWillMount () {
    // const wishlistBooks = this.state.books
    console.log('Successfully mounted')
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
        // console.log(fullList)
        fullList.forEach(
          (book) => {
            axios({
              url: `${apiUrl}/books/${book.book}`,
              method: 'GET'
            })
              .then(res => {
                tempArray.push(res.data.book)
                this.setState({ books: tempArray })
              })
          }
        )
        // console.log('######', res.data.wishlists[1].book)
        // wishlistBooks.push(res.data.books)
        // this.setState({ books: wishlistBooks })
      })
      .catch(console.error)
  }
  render () {
    const { books } = this.state
    const { user } = this.props
    return (
      <div>
        {books.length > 0 && books.map(book => (
          <Book key={book} user={user} book={book} />
        ))}
      </div>
    )
  }
}

export default Wishlist
