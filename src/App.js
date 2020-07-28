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
  const [ spinner, setSpinner ] = useState([]);
  let timeout;
  
	const debounce = (e) => {
    setCards([]);
    setSpinner(true); 
		clearTimeout(timeout);
		setTimeout(() => {
      if (window.innerWidth < 531) {        
        document.getElementById("search-box").scrollIntoView({behavior: "smooth", block: "start"})
      }
      document.activeElement.blur();
      getResults();
		}, 1000);
	};

	const getResults = () => {    
		const searchTerm = document.getElementsByClassName('search')[0].value;
		let filteredArr = [];
		let elements = [];

		if (searchTerm.length > 0) {
      //takes the search term and checks each object for a match, if found it is added to filteredArr and then sorted and a set of "cards" is generated and set as a state.
			const filterByValue = data.filter(function(obj) {
				const terms = searchTerm.toLowerCase().split(' ');
				let flag = true;
				for (var i = 0; i < terms.length; i++) {
					if (
            //if the description or the category don't contain the term return false
						!obj['description'].toLowerCase().includes(terms[i]) &&
						!obj['category'].toLowerCase().includes(terms[i])
					) {
						flag = false;
					}
				}
				if (flag) {
          //if the description or the category contain the term return true
					return true;
				}
			});

			filteredArr.push(filterByValue);
			filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));
			filteredArr[0].sort(sortByVegan);

			for (var i = 0; i < filteredArr[0].length; i++) {
				elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
			}
      setSpinner(false);
			setCards(elements);
		}

		if (searchTerm === '') {
      setSpinner(false);
			filteredArr = [];
			elements = [];
      setCards([]);
      if (window.innerWidth < 531) {
        document.getElementById("top").scrollIntoView({behavior: "smooth", block: "start"})
      }      
		}
	};

	const getHotDrinks = (e) => {
		e.preventDefault();
		console.log('Hot drinks');
		setCards([]);

		let filteredArr = [];
		let elements = [];
		const terms = [ 'Hot Chocolate', 'Coffee', 'Tea', 'Hot Drink' ];
		const filterByValue = data.filter(function(obj) {
			let flag = true;
			if (!terms.some((x) => obj['category'].includes(x))) {
				flag = false;
			}
			if (flag) {
				return true;
			}
		});

		filteredArr.push(filterByValue);
		filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));
		filteredArr[0].sort(sortByVegan);

		for (var i = 0; i < filteredArr[0].length; i++) {
			elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
		}

		setCards(elements);
	};

	const getColdDrinks = (e) => {
		e.preventDefault();
		data.forEach((x) => console.log(x['category']));
		setCards([]);

		let filteredArr = [];
		let elements = [];
		const terms = [ 'Cold Drinks' ];
		const filterByValue = data.filter(function(obj) {
			let flag = true;
			if (!terms.some((x) => obj['category'].includes(x))) {
				flag = false;
			}
			if (flag) {
				return true;
			}
		});

		filteredArr.push(filterByValue);
		filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));
		filteredArr[0].sort(sortByVegan);

		for (var i = 0; i < filteredArr[0].length; i++) {
			elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
		}

		setCards(elements);
	};

	const getCakes = (e) => {
		e.preventDefault();
		setCards([]);

		let filteredArr = [];
		let elements = [];
		const terms = [ 'Sweet Pastries', 'Cakes' ];
		const filterByValue = data.filter(function(obj) {
			let flag = true;
			if (!terms.some((x) => obj['category'].includes(x))) {
				flag = false;
			}
			if (flag) {
				return true;
			}
		});

		filteredArr.push(filterByValue);
		filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));
		filteredArr[0].sort(sortByVegan);

		for (var i = 0; i < filteredArr[0].length; i++) {
			elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
		}

		setCards(elements);
	};

	const getFood = (e) => {
		e.preventDefault();
		setCards([]);

		let filteredArr = [];
		let elements = [];
		const terms = [
			'Snacks',
			'Sandwiches',
			'Salads',
			'Panini',
			'Toasties',
			'Hot Meals',
			'Breakfast',
			'Savoury Pastries'
		];
		const filterByValue = data.filter(function(obj) {
			let flag = true;
			if (!terms.some((x) => obj['category'].includes(x))) {
				flag = false;
			}
			if (flag) {
				return true;
			}
		});

		filteredArr.push(filterByValue);

		filteredArr[0].sort((a, b) => a.description.localeCompare(b.description));

		filteredArr[0].sort(sortByVegan);

		for (var i = 0; i < filteredArr[0].length; i++) {
			elements.push(<Card value={filteredArr[0][i]} key={uuid()} indexKey={i} />);
		}

		setCards(elements);
	};

	return (
		<div className="Vegan Costa Coffee">
			<Header />
			<div className="main-content container">
          <Searchbox
            debounce={debounce}
            getHotDrinks={getHotDrinks}
            getColdDrinks={getColdDrinks}
            getCakes={getCakes}
            getFood={getFood}
          />

				<div className="card-container" id="cards">
          {spinner === true ? <img className="loading-spinner" src={require('../src/imgs/loading.gif')} alt="Loading"></img> : <span></span>}
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
