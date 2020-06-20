import React, { Component } from 'react';
import Nav from '../nav/nav.jsx';
import Header from '../header/header.jsx';
import './layout.scss';

export default class Layout extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section className="layout">
        <Nav />
        <section className="site-layout">
          <Header />
          <main className="site-layout-content">
            <div className="site-layout-background">
              {this.props.children}
            </div>
          </main>
        </section>
      </section>
    );
  }
}