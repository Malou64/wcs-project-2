import React, { useState, useEffect } from 'react';
import { Grid, Header, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Article from './Article.jsx';
import styles from './source.module.css';
import HackerNoon from '../assets/images/HackerNoon.png';
import reddit from '../assets/images/reddit.png';
import twitter from '../assets/images/twitter.png';

const Source = ({ source, data, isResizing }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToBeDisplayed, setCardsToBeDisplayed] = useState([]);
  //const [nbCard, setNbCard] = useState(4); // To be used once responsivity will be put in place

  //Display a number of card according to the window width
  let displayNbCard = () => {
    if (window.innerWidth >= 1440) {
      return 4;
    }
    if (window.innerWidth >= 1024 && window.innerWidth < 1440) {
      return 3;
    }
    if (window.innerWidth >= 650 && window.innerWidth < 1024) {
      return 2;
    }
    if (window.innerWidth >= 320 && window.innerWidth <= 650) {
      return 1;
    } else {
      return 1;
    }
  };

  // Navigation within the custom carrousel
  const handleClickArrow = (direction) => {
    if (direction === 'left') {
      setStartIndex(
        (((startIndex - 1) % data.length) + data.length) % data.length
        // https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e
      );
    } else if (direction === 'right') {
      setStartIndex((startIndex + 1) % data.length);
    }
  };

  // This Effect is launched each time new data is get from the APIs or following a click on the nav arrows
  useEffect(() => {
    // Update state.cardsToBeDisplayed according to state.startIndex
    let finalArray = [];
    if (data.length > 0) {
      let currentIndex = startIndex;
      for (let i = 0; i < displayNbCard(); i++) {
        finalArray.push(data[currentIndex++ % data.length]);
      }
      setCardsToBeDisplayed(finalArray);
    }
  }, [startIndex, data, isResizing]);

  let title = source;
  let iconName = source;
  let icon;

  if (iconName === 'twitter') {
    icon = twitter;
  } else if (iconName === 'reddit') {
    icon = reddit;
  } else if (iconName === 'hacker noon') {
    icon = HackerNoon;
  }

  let cardDisplay = cardsToBeDisplayed.map((post) => {
    return (
      <Grid.Column width={12 / displayNbCard()} key={post.id} id={post.id}>
        <Article key={post.id} id={post.id} data={post} />
      </Grid.Column>
    );
  });

  return (
    <Grid>
      <Grid.Row style={{ marginTop: '40px' }}>
        <Header as="h3" style={{ textTransform: 'uppercase', margin: 'auto' }}>
          {title}
          <Image className={styles.imageIcon} src={icon} size="mini" />
        </Header>
        <br />
      </Grid.Row>
      <Grid.Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Grid.Column className={styles.leftArrow} width={2} style={{ paddingRight: '0px' }}>
          <Button icon="arrow left" onClick={() => handleClickArrow('left')} style={{ margin: '0px' }} />
        </Grid.Column>
        {cardDisplay}
        <Grid.Column className={styles.rightArrow} width={2} style={{ paddingLeft: '0px' }}>
          <Button icon="arrow right" onClick={() => handleClickArrow('right')} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

Source.propTypes = {
  source: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Source;
