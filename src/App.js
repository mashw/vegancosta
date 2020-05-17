import React, { useState } from 'react';
import './App.scss';
import uuid from 'react-uuid';
import { sortByVegan } from './util/helper-functions';

import Header from './components/header';
import { Footer } from './components/footer';
import Searchbox from './components/searchbox';
import { data } from './data/data';
import { Card } from './components/card';

function App() {
	const [ cards, setCards ] = useState([]);
  let timeout;

  const debounce = () => {
    clearTimeout(timeout);
    setTimeout(() => {
      getResults();
    },1000);
  };

	const getResults = () => {
		const searchTerm = document.getElementsByClassName('search')[0].value;
		let filteredArr = [];
    let elements = [];

    if (searchTerm.length > 2) {
      const filterByValue = (array, string) => {
        return array.filter((x) =>
          // Object.keys(x).some(k => x[k].toString().toLowerCase().includes(string.toLowerCase()))
          Object.keys(x).some((k) => x[k].toString().toLowerCase().includes(string.toLowerCase()))
        );
      };
  
      filteredArr.push(filterByValue(data, searchTerm));
  
      filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));
  
      filteredArr[0].sort(sortByVegan);
  
      for (var i = 0; i < filteredArr[0].length; i++) {
        elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
      }
  
      setCards(elements);
    }



		if (searchTerm === '') {
			filteredArr = [];
			elements = [];
			setCards([]);
		}
	};

	return (
		<div className="Vegan Costa Coffee">
			<Header />
			<div className="main-content container">
				<Searchbox debounce={debounce} />
				<div className="card-container">
					{cards}
					{/* {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={cards[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{cards[index]}</animated.div>
          </animated.div>
        ))} */}
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;
