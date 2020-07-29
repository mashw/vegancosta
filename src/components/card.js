import React, { useState } from 'react';
import { Textfit } from 'react-textfit';

import { getProductStatus, useFitText } from '../util/helper-functions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { coffee } from '../imgs/bg-icons/coffee.svg';

library.add(faCookieBite, faInfoCircle, faCheck, faTimesCircle);


export const Card = (props) => {
	const { fontSize, ref } = useFitText();

	const expandDiv = (e) => {
		if (infoState === false) {
			const card = document.getElementById(e);
			card.classList.add('grow');
			setInfoState(true);
		} else if (infoState === true) {
			const card = document.getElementById(e);
			card.classList.remove('grow');
			setInfoState(false);
		}
	};

	const getStatusIcon = (props) => {
		if (props.value['vegans'] === 'YES') {
			return <FontAwesomeIcon icon={faCheck} size="lg" className="vegan-icon" />;
		} else if (props.value['vegans'] === 'NO' && props.value['cc-vegans'] === 'YES') {
			return <FontAwesomeIcon icon={faInfoCircle} size="lg" className="cc-vegan-icon" />;
		} else {
			return <FontAwesomeIcon icon={faTimesCircle} size="lg" className="non-vegan-icon" />;
		}
	};

	const downArrow = '\u25BC';
	const upArrow = '\u25B2';

	const [ infoState, setInfoState ] = useState(false);

	const getNutStatus = (props) => {
		if (props.value.peanuts === 'YES' || props.value.lupin === 'YES' || props.value.treenuts === 'YES') {
			return true;
		} else {
			return false;
		}
	};

	const getPortionSize = (category) => {
		switch (category) {
			case 'Cakes':
				return 'per cake';
			case 'Coffee':
				return 'per Medio in-store';
			case 'Hot Chocolate':
				return 'per Medio in-store';
			default:
				return 'per portion';
		}
	};

	const getVeganStatus = () => {
		switch (props.value["vegan-status"]) {
			case 'NO':
				return (<><img src={require('../imgs/x.svg')} height="27px" alt="Not vegan" /><h3>Not Vegan</h3></>);
			case 'YES':
				return (<><img src={require('../imgs/seal.svg')} height="27px" alt="Vegan" /><h3>Vegan</h3></>);
			case 'CC':
				return (<><img src={require('../imgs/question.svg')} height="27px" alt="Vegan" /><h3>Cross-contamination risk</h3></>);
			default:
				return ("Undetermined");
		}
  };
  

  const getProductNotes = () => {
    if (props.value["vegan-status"] === "CC") {
      return (
        //if product is cc-vegan
        <span>{props.value["notes"] ? props.value["notes"] : null}</span>
      )
    }
    else if (props.value["vegan-status"] === "YES") {      
      return (
        //if product is true vegan
        <span>{props.value["notes"] ? props.value["notes"] : null}</span>
      )
    }
    else if (props.value["vegan-status"] === "NO") {
      return(
        //if product is not vegan
        <span>{props.value["notes"] ? props.value["notes"] : null}</span>
      )
    }
  };

  const getCardCategory = () => {
    return props.value["category"].replace(/\s/g, '').toLowerCase();
  }

	return (
    <div className="card-bg">
		<div className={`card`} id={props.indexKey}>
			<div
				className={
					props.value["vegan-status"] !== 'NO' ? props.value["vegan-status"] === 'CC' ? (
						'arrow-tab yellow'
					) : (
						'arrow-tab green'
					) : (
						'arrow-tab red'
					)
				}
			/>

  		<div className={`main-card-info ${getCardCategory()}`}>
				<div className="product-title-wrapper">
					<div className="product-title">
					{props.value.description}
						
					</div>
				</div>
				<div className="tags-wrapper">
				{props.value['vegan-status'] === 'YES' || props.value['vegan-status'] === 'CC' ? (
						<div className={`vegan-tag`}>VEGAN</div>
					) : null}

					{props.value.vegetarians === 'YES' ? <div className="vegetarian-tag">VEGETARIAN</div> : null}

					{getNutStatus(props) === true ? <div className="nuts-tag">NUTS</div> : null}

					{props.value.wheat === 'YES' ? <div className="gluten-tag">GLUTEN</div> : null}
				</div>
				<div className="status-notes-main-wrapper">
				<div className="status-wrapper">
					{getVeganStatus()}
				</div>
				{getProductNotes().length > 0 ? <div className="notes-wrapper">
					{getProductNotes()}
				</div> : null}
				
				</div>
				
			</div>
			<div className="nutritional-wrapper noSelect" onClick={() => expandDiv(props.indexKey)}>
				<div className="more-info-header noSelect">
					{/* <h4>Nutritional Info {infoState === false ? downArrow : upArrow}</h4> */}
          <span>Nutritional Info</span>
				</div>
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th colSpan="5">{getPortionSize(props.value['category'])}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>kcal</td>
								<td>{props.value['kcal-portion']}</td>
								<td />
								<td>Sugar(g)</td>
								<td>{props.value['sugar-portion']}</td>
							</tr>
							<tr>
								<td>Fat(g)</td>
								<td>{props.value['fat-portion']}</td>
								<td />
								<td>Carbohydrate(g)</td>
								<td>{props.value['carbs-portion']}</td>
							</tr>
							<tr>
								<td>Saturates(g)</td>
								<td>{props.value['saturates-portion']}</td>
								<td />
								<td>Protein(g)</td>
								<td>{props.value['protein-portion']}</td>
							</tr>
							<tr>
								<td>Salt(g)</td>
								<td>{props.value['salt-portion']}</td>
								<td />
								<td />
								<td />
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
    </div>
	);
};

{
	/* <div className="info-wrapper">
				<div className="info-top">
					<div className="product-icon">
						<FontAwesomeIcon icon={faCookieBite} size="2x" className="fa category-icon" />
					</div>

					<div className="product-title">
						<div className="title" ref={ref} style={{ fontSize, height: 40, width: 310}}>
							<h3>{props.value['description']}</h3>
						</div>

						<div className="tags-wrapper">
							
              {(props.value["vegan-status"] === "YES" || props.value["vegan-status"] === "CC")? <span className={`vegan-tag`}>VEGAN</span> : null}

              {props.value.vegetarians === "YES" ? <span className="vegetarian-tag">VEGETARIAN</span> : null}

              {getNutStatus(props) === true ? <span className="nuts-tag">NUTS</span> : null}

              {props.value.wheat === "YES" ? <span className="gluten-tag">GLUTEN</span> : null}
							
							
							
						</div>
					</div>
				</div>
				<div className="info-bottom">
					<span className="status-wrapper">
						<div className="status-icon">
							{getStatusIcon(props)}
						</div>
						<div className="status-text">
							<p>This product {getProductStatus(props)}</p>
						</div>
					</span>
					<span className="notes-wrapper">
						<div className="notes-icon">
							<FontAwesomeIcon icon={faInfoCircle} size="lg" className="" />
						</div>
						<div className="notes-text">
							<p>There are no notes for this item.</p>
						</div>
					</span>
				</div>
			</div> */
}
