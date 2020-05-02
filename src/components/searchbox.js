import React from 'react';

const Searchbox = (props) => {
    return (
        <div className="searchbox">
        <h1>Check if a Costa product is vegan...</h1>
            <form className="search-form">
            <input className="search" onChange={props.getResults} type="text" placeholder="Check a product..." />
            <button type="submit">
                <img src={require('../imgs/search.svg')} width="170" height="95" alt="Vegan Costa" />
            </button>
            </form>
        </div>
    )
}

export { Searchbox as default };