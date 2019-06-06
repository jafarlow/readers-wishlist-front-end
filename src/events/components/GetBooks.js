import React, { Component } from 'react'
import axios from 'axios'

import apiUrl from '../../apiConfig.js'
import Book from './Book.js'
// import { Link } from 'react-router-dom'

class GetBooks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      books: [],
      wishlist: []
    }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/wishlists`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ wishlist: res.data.wishlists })
      })
  }
  handleOnClick = () => {
    const newBooks = []

    this.setState({ books: newBooks })
    const randomInteger = (min, max) => {
      const array = []
      for (let i = 0; i < 3; i++) {
        min = Math.ceil(min)
        max = Math.floor(max)
        array.push(Math.floor(Math.random() * (max - min + 1)) + min)
      }
      return array
    }
    axios({
      url: `${apiUrl}/books`,
      method: 'GET'
    })
      .then(res => {
        const booksArray = res.data.books
        // const filteredArray = this.state.wishlist.map(book => {
        //   booksArray.filter(book => {
        //     !booksArray.includes(book)
        //   })
        // })
        // const filteredArray = booksArray.filter(book => !this.state.wishlist.includes(book))
        // const filteredArray = this.state.wishlist.filter(book => !booksArray.includes(book))
        const filteredArray = booksArray.filter(book => !this.state.wishlist.includes(book.book))
        // const mappededArray = filteredArray.map(book => booksArray.filter(book => this.state.wishlist.includes(book._id)))
        // const filteredArray = booksArray.map(book => this.state.wishlist.filter(book => booksArray.includes(book._id)))
        // const filteredArray = booksArray.map(book => {
        //   this.state.wishlist.filter(!this.state.wishlist.includes(book))
        // })
        console.log('#######', this.state.wishlist)
        console.log('***********', filteredArray.length)
        const randomIndex = randomInteger(0, filteredArray.length)
        randomIndex.forEach(
          (indexVal) => {
            newBooks.push(booksArray[indexVal])
            this.setState({ books: newBooks })
          }
        )
      })
      .catch(console.error)
  }

  render () {
    const { books } = this.state
    const { user } = this.props
    return (
      <div>
        {<button onClick={this.handleOnClick}>Get books!</button>}
        {books.length > 0 && books.map(book => (
          <Book key={book._id} user={user} book={book} />
        ))}
      </div>
    )
  }
}

export default GetBooks
