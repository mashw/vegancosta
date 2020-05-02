import React from 'react';

export const Card  = (props) => {
    return (
        <div className="card">
            <p>{props.value["description"]}</p>
            <p>vegan = {props.value["vegan"]} </p>
        </div>
    )
};