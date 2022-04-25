import './App.css';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import Categories from "../Categories/categories";
import React, {Component} from "react";
import BookService from "../../repository/bookRepository";
import Header from "../Header/header";
import Book from "../Books/BookList/books";
import BooksAdd from "../Books/BookAdd/BooksAdd";
import BookEdit from "../Books/BookEdit/BookEdit";
import Authors from "../Authors/authors";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit authors={this.state.authors}
                                      categories={this.state.categories}
                                      onEdit={this.editProduct}
                                      book={this.state.selectedBook}
                            />}/>
                        <Route path={"/books/add"} exact render={() =>
                            <BooksAdd authors={this.state.authors}
                                      categories={this.state.categories}
                                      onEdit={this.editProduct}
                                      onAddBook={this.addBook}/>} />
                        <Route path={"/books"} exact render={() =>
                            <Book books={this.state.books}
                                  onDelete={this.deleteBook}
                                  onEdit={this.getBook}
                                  onMarkAsTaken={this.markAsTaken}
                            />}/>
                        <Route path={"/categories"} exact render={() =>
                            <Categories categories={this.state.categories}/>}/>
                        <Route path={"/authors"} exact render={() =>
                            <Authors authors={this.state.authors}/>}/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks()
        this.loadCategories();
        this.loadAuthors()
    }

    loadBooks = () => {
        BookService.fetchBooks(0)
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadCategories = () => {
        BookService.fetchCategories()
            .then((data) => {
                console.log(data)
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        BookService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    addBook = (name, bookCategory, author, availableCopies) => {
        BookService.addBook(name, bookCategory, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    editProduct = (id, name, bookCategory, author, availableCopies) => {
        BookService.editBook(id, name, bookCategory, author, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    deleteBook = (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => {
                    console.log(data)
                this.setState({
                    selectedBook: data.data
                })

            })
    }

    markAsTaken = (id) => {
        BookService.markAsTaken(id)
            .then((data) => {
                this.loadBooks();
            })
    }

}

export default App;
