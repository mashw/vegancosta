import React, { useState } from 'react';
import './App.scss';
import { useTrail, animated } from 'react-spring';
import uuid from 'react-uuid';
import { sortByVegan } from './util/helper-functions';


import Header from './components/header';
import Searchbox from './components/searchbox';
import { data } from './data/data';
import { Card } from './components/card';

function App() {
    const [ cards, setCards ] = useState([]);
    const config = { mass: 1, tension: 1500, friction: 50 };
    const [toggle, set] = useState(true);

    const trail = useTrail(cards.length, {
      config,
      opacity: toggle ? 1 : 0,
      x: toggle ? 0 : 20,
      height: toggle ? 100 : 0,
      duration: 200,
      from: { opacity: 1, x: 20, height: 0 },
    });

    const getResults = () => {
      const searchTerm = document.getElementsByClassName('search')[0].value;
      let filteredArr = [];
      let elements = [];

      const filterByValue = (array, string) => {
        return array.filter(x =>
            // Object.keys(x).some(k => x[k].toString().toLowerCase().includes(string.toLowerCase()))
            Object.keys(x).some(k => x[k].toString().toLowerCase().includes(string.toLowerCase()))
        );
      };

      filteredArr.push(filterByValue(data, searchTerm));

      filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));

      filteredArr[0].sort(sortByVegan);
  
      for(var i = 0; i < filteredArr[0].length; i++) {
        elements.push(<Card value={filteredArr[0][i]} key={uuid()} />);
      }

      setCards(elements);

      if (searchTerm === "") {
        filteredArr = [];
        elements = [];
        setCards([]);
      }
    };
  
	return (
		<div className="Vegan Costa Coffee">
			<Header />
			<div className="main-content container">
				<Searchbox 
          getResults = { getResults }
        />
      <div className="card-container">
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={cards[index]}
            className="trails-text"
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}>
            <animated.div style={{ height }}>{cards[index]}</animated.div>
          </animated.div>
        ))}
      </div>
		</div>
    </div>
	);
}

export default App;
