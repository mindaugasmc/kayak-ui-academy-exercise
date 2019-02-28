import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import styles from './autocomplete.css';
import PlayerIcon from '../../../images/player_icon.svg';
import SearchIcon from '../../../images/search_icon.svg';


class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
      active: false,
      error: ''
    };
  }

  fetchMovies = () => {
    const { search } = this.state;
    fetch(
      `https://api.themoviedb.org/3/search/movie?` +
        `api_key=cab2afe8b43cf5386e374c47aeef4fca&language=en-US&query=` +
        `${search}&page=1&include_adult=false`
    )
      .then(res => res.json())
      .then(res => this.addMovies(res.results));
  };

  addMovies = movies => {
    this.setState({
      movies: movies.slice(0, 8),
      error: movies.length === 0 ? 'No results found' : ''
    });
  };

  handleChange = ({ target: { value } }) => {
    this.setState(
      {
        search: value,
        active: value.length > 0,
        movies: [],
        error: value.length < 3 ? 'Search phrase must be at least 3 characters long' : ''
      },
      () => value.length > 2 && this.fetchMovies()
    );
  };

  setMovie = title => {
    this.setState({
      search: title,
      active: false,
      movies: [],
      error: ''
    });
  };

  renderMovie = ({ id, title, vote_average, release_date }) => {
    return (
      <div className={styles.card} key={id} onClick={() => this.setMovie(title)}>
        <div className={styles.mainText}>{title}</div>
        <div className={styles.altText}>
          {`${vote_average % 1 !== 0 ? vote_average : `${vote_average}.0`} Rating, `}
          {release_date.slice(0, 4)}
        </div>
      </div>
    );
  };

  render() {
    const { search, active, movies, error } = this.state;
    return (
      <div className={styles.container}>
        <div className={active ? styles.content : `${styles.content} ${styles.contentActive}`}>
          <div className={styles.searchBar}>
            <div className={styles.iconWrapper}>
              <PlayerIcon className={`${styles.icon} ${styles.whitePlayerIcon}`} />
            </div>
            <div>
              <div className={active ? styles.inputWrapper : ''}>
                {active && (
                  <div className={`${styles.iconWrapper} ${styles.darkPlayerIconWrapper}`}>
                    <PlayerIcon className={`${styles.icon} ${styles.darkPlayerIcon}`} />
                  </div>
                )}
                <input
                  autoComplete="off"
                  value={search}
                  onChange={this.handleChange}
                  className={!active ? styles.inputDefault : styles.inputActive}
                  placeholder="Enter movie name"
                />
                {active && <div className={styles.altText}>Enter a movie name</div>}
              </div>
              {active && (
                <div className={styles.movieList}>
                  {error && <div className={`${styles.card} ${styles.mainText}`}>{error}</div>}
                  {movies.map(this.renderMovie)}
                </div>
              )}
            </div>
          </div>
          {!active && (
            <div className={`${styles.iconWrapper} ${styles.searchIconWrapper}`}>
              <SearchIcon className={`${styles.icon} ${styles.searchIcon}`} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default hot(Autocomplete);
