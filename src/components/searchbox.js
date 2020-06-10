import React from 'react';

const Searchbox = (props) => {
    return (
        <div className="searchbox">
        
            <form className="search-form">
            <h1>Check if a Costa product is vegan...</h1>
                <input className="search" onChange={props.debounce} type="text" placeholder="Start typing..." />
                {/* <button type="submit">
                    <img src={require('../imgs/search.svg')} width="170" height="95" alt="Vegan Costa" />
                </button> */}
                <p className="category-text">Or choose a category to show a list of available products:</p>
                <div className="filter-buttons-wrapper">
                    <button className="filter hot-drinks" onClick={props.getHotDrinks}>
                        Hot Drinks
                    </button>
                    <button className="filter cold-drinks" onClick={props.getColdDrinks}>
                        Cold drinks
                    </button>
                    <button className="filter cakes" onClick={props.getCakes}>
                        Cakes
                    </button>
                    <button className="filter food" onClick={props.getFood}>
                        Food
                    </button>
                    <button className="filter custom-drinks">
                        Custom drinks!
                    </button>      
                </div>
            </form>
        </div>
    )
}

export { Searchbox as default };