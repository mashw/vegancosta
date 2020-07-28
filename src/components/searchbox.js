import  React, { useState, useEffect } from 'react';

const Searchbox = (props) => {

    const [windowWidth, setWindowWidth] = useState([window.innerWidth]);

    useEffect(() => {
      const handleResize = () => {
        const newWidth = window.innerWidth;
        // if (newWidth < 430) {
        //   console.log("smaller than 930");
        //   let buttonWrapper = document.getElementById("buttons");
        //   buttonWrapper.classList.add("wider-wrapper");
        // }
        // else {
        //   console.log("larger or equal than 930");
        //   let buttonWrapper = document.getElementById("buttons");
        //   buttonWrapper.classList.remove("wider-wrapper");
        // }
        setWindowWidth(newWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    });


    return (
        <div className="searchbox">
        
            <form className="search-form">
            <h1>Check a product...</h1>
                <input className="search" id="search-box" onChange={props.debounce} type="text" placeholder="Start typing..." />
                {/* <button type="submit">
                    <img src={require('../imgs/search.svg')} width="170" height="95" alt="Vegan Costa" />
                </button> */}
                <p className="category-text">Or choose a category to show a list of available products:</p>
                <div className="filter-buttons-wrapper" id="buttons">
                    <button className="filter hot-drinks" onClick={props.getHotDrinks}>
                        {windowWidth >= 930 ?  "Hot Drinks" : "!"}
                    </button>
                    <button className="filter cold-drinks" onClick={props.getColdDrinks}>
                        {windowWidth >= 930 ?  "Cold Drinks" : "!"}
                    </button>
                    <button className="filter cakes" onClick={props.getCakes}>
                        {windowWidth >= 930 ?  "Cakes" : "!"}
                    </button>
                    <button className="filter food" onClick={props.getFood}>
                        {windowWidth >= 930 ?  "Food" : "!"}
                    </button>
                    <button className="filter custom-drinks">
                        {windowWidth >= 930 ?  "Custom Drinks" : "!"}
                    </button>      
                </div>
            </form>
        </div>
    )
}

export { Searchbox as default };