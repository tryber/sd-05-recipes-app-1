import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

import './style.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  handleClick() {
    if (this.state.searchBar) {
      this.setState({ searchBar: false });
    } else {
      this.setState({ searchBar: true });
    }
  }

  renderHeader() {
    const { titulo } = this.props;
    return (
      <div className="header-container">
        <Link to={'/perfil'}>
          <img src={profileIcon} alt="Profile" data-testid="profile-top-btn" />
        </Link>
        <h4 data-testid="page-title">{titulo}</h4>
        <button
          className="btn-floating red"
          onClick={this.handleClick}
          data-testid="search-top-btn"
          src={searchIcon}
        >
          <i class="material-icons">search</i>
        </button>
      </div>
    );
  }
  render() {
    const { searchBar } = this.state;
    if (!searchBar) {
      return this.renderHeader();
    }
    return (
      <div>
        {this.renderHeader()}
        <SearchBar />
      </div>
    );
  }
}

Header.propTypes = {
  titulo: PropTypes.string.isRequired,
};

export default Header;
