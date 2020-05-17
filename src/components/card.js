import React, { useState } from 'react';

import { getProductStatus, useFitText } from '../util/helper-functions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faInfoCircle, faCheck, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCookieBite, faInfoCircle, faCheck, faTimesCircle);

export const Card = (props) => {
	const { fontSize, ref } = useFitText();

	const expandDiv = (e) => {
		if (infoState === false) {
			const card = document.getElementById(e);
			card.classList.add('grow');
			setInfoState(true);
		}
		else if (infoState === true) {
			const card = document.getElementById(e);
			card.classList.remove('grow');
			setInfoState(false);

		}
	};

	const getStatusIcon = (props) => {
		if (props.value["vegans"] === "YES") {
			return <FontAwesomeIcon icon={faCheck} size="lg" className="vegan-icon" />
		}
		else if (props.value["vegans"] === "NO" && props.value["cc-vegans"] === "YES") {
			return <FontAwesomeIcon icon={faInfoCircle} size="lg" className="cc-vegan-icon" />
		}
		else {
			return <FontAwesomeIcon icon={faTimesCircle} size="lg" className="non-vegan-icon" />
		}
	}

	const downArrow = "\u25BC";
	const upArrow = "\u25B2";

  const [infoState, setInfoState] = useState(false);
  
  const getNutStatus = (props) => {
    if (props.value.peanuts === "YES" || props.value.lupin === "YES" || props.value.treenuts === "YES") {
      return true;
    }
    else {
      return false;
    }
  };

	return (
		<div className="card" id={props.indexKey}>
			<div
				className={
					props.value['vegans'] === 'NO' ? props.value['cc-vegans'] === 'YES' ? (
						'arrow-tab yellow'
					) : (
						'arrow-tab red'
					) : (
						'arrow-tab green'
					)
				}
			/>
			<div className="info-wrapper">
				<div className="info-top">
					<div className="product-icon">
						<FontAwesomeIcon icon={faCookieBite} size="2x" className="fa category-icon" />
					</div>

					<div className="product-title">
						<div className="title" ref={ref} style={{ fontSize, height: 40, width: 290 }}>
							<h3>{props.value['description']}</h3>
						</div>

						<div className="tags-wrapper">
							
              {props.value.vegans === "YES" || props.value["cc-vegans"] === "YES"? <span className={`vegan-tag`}>VEGAN</span> : null}

              {props.value.vegetarian === "YES" ? <span className="vegetarian-tag">VEGETARIAN</span> : null}

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
			</div>
			<div className="nutritional-wrapper noSelect" onClick={() => expandDiv(props.indexKey)}>
				<div className="more-info-header noSelect">
					<h4>Nutritional Info {infoState === false ? downArrow : upArrow }</h4>
				</div>
				<div className="table-wrapper">
					<table>
						<thead>
							<tr>
								<th colSpan="5">Per xyz</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>kcal</td>
								<td>{props.value['kcal-portion']}</td>
								<td></td>
								<td>Sugar(g)</td>
								<td>{props.value['sugar-portion']}</td>
							</tr>
							<tr>
								<td>Fat(g)</td>
								<td>{props.value['fat-portion']}</td>
								<td>									
								</td>
								<td>Carbohydrate(g)</td>
								<td>{props.value['carbs-portion']}</td>
							</tr>
							<tr>
								<td>Saturates(g)</td>
								<td>{props.value['saturates-portion']}</td>
								<td></td>
								<td>Protein(g)</td>
								<td>{props.value['protein-portion']}</td>
							</tr>
							<tr>
								<td>Salt(g)</td>
								<td>{props.value['salt-portion']}</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
