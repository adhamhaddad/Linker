import React from 'react';
import './Searchbar.css';

function SearchBar() {
  return (
    <div className='search-bar'>
      <input type='search' placeholder='Type to Search ..' />
      <button title='search'>
        <i className='fa-solid fa-search'></i>
      </button>
    </div>
  );
}
export default SearchBar;
