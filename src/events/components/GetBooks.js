import React, { Component } from 'react'
// import { Link } from 'react-router-dom'

class GetBooks extends Component {
  constructor () {
    super()
    this.state = {
      books: []
    }
  }
  handleOnClick = () => {
    const newBooks = [...this.state.books]
    // axios call to get a book
    // newBooks becomes .then()
    newBooks.push('book')
    this.setState({ books: newBooks })
  }
  render () {
    return (
      <div>
        {this.state.books.length < 3 && <button onClick={this.handleOnClick}>Get books!</button>}
        {this.state.books.map((book, i) => (
          <div key={i}>Book</div>
        ))}
      </div>
    )
  }
}

export default GetBooks
