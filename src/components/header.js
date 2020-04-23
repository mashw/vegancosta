import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="mh-logo">
          <img src={require('../img/logo.svg')} width="170" height="95" alt="Vegan Costa" />
        </h1>
        <nav>
          <ul className="main-nav">
            <ul className="main-nav-list">
              <li>
                <a className="" href="#">Home</a>
              </li>
              <li>
                <a className="" href="#">Love coffee?</a>
              </li>
              <li>
                <a className="" href="#">About</a>
              </li>
            </ul>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export { Header as default };