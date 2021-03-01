
import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';


function App() {

  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [bookList, setBookList] = useState([]);
  const [newBookName, setNewBookName] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3003/api/get').then((response) => {
      setBookList(response.data);
    });
  }, []);

  const submitBookDetails = () => {

    axios.post('http://localhost:3003/api/insert', {
     bookName: bookName,
      author: author,
      category: category,
    });
    
      setBookList([
        ...bookList, 
        {bookName: bookName, author: author, category: category}
      ]);
  
  };

  const removeBook = (id) => {
    axios.delete('http://localhost:3003/api/delete/${id}'); //add variable directly to route
  };

  const updateBook = (id) => {
    axios.put('http://localhost:3003/api/update', {
      id: id,
      bookName: newBookName,
       author: newAuthor,
       category: newCategory,
     }).then((response) => {
          setBookList(bookList.map((val) => {
            return val.id == id ? {id: val.id, bookName: newBookName, author: newAuthor, category: newCategory} : val;
          }))
     })

    
  };

  return (
    <div className="App">
      <h1> BOOK RACK </h1>

            <div className="form">
              <label>Book Name</label>
              <input type="text" name="bookName" onChange = {(e) =>
              {
                  setBookName(e.target.value);
              }}/>
            
            
              <label>Author</label>
              <input type="text" name="author" onChange = {(e) =>
              {
                  setAuthor(e.target.value);
              }} />

              <label>Category</label>
              <input type="text" name="category" onChange = {(e) =>
              {
                  setCategory(e.target.value);
              }} />
              

              <button onClick={submitBookDetails} className="btn">Add a Book to Rack</button>
            </div>
           {bookList.map((val, key) => {
            return (
            <div className="details">
              
                <span>Book Name</span> : {val.bookName} | &nbsp;<span>Author</span> : {val.author} | &nbsp;<span>Category</span> : {val.category} |
                 &nbsp;&nbsp;&nbsp;
                 <span><button onClick={() => {removeBook(val.id)}}>Remove</button></span> | 
                 <span><button onClick = {() => {updateBook(val.id)}}>change</button></span><input type="text" id="updateInput" placeholder="Book Name" onChange = {(e) => {setNewBookName(e.target.value);}}/>
                 <input type="text" id="updateInput" placeholder="Author" onChange = {(e) => {setNewAuthor(e.target.value);}}/>
                 <input type="text" id="updateInput" placeholder="Category" onChange = {(e) => {setNewCategory(e.target.value);}}/>
                 
              
            </div>
             
             
                
            
            );
            })} ;
    </div>
  );
}

export default App;
