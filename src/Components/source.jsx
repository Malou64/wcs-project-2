import React, { Component } from 'react';
import Article from './Article.jsx';
import { Grid, Header, Container, Image, Button, Responsive } from 'semantic-ui-react';
import './source.css';
import HackerNoon from '../assets/images/HackerNoon.png';
import reddit from '../assets/images/reddit.png';
import twitter from '../assets/images/twitter.png';

class Source extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      startIndex: 0,
      nbCard: 4,
      cardsToBeDisplayed: [],
    };
  }
  // Si on clique sur la flèche de gauche, nos cards se déplacent vers la gauche
  // Si on clique sur la flèche de droite, nos cards se déplacent vers la droite
  handleClick = (direction) => {
    if (direction === 'left') {
      this.setState({ startIndex: this.state.startIndex - 1 });
    } else if (direction === 'right') {
      this.setState({ startIndex: this.state.startIndex + 1 });
      let finalArray = [];
      let currentIndex = this.state.startIndex;
      let i = 0;
      while (i < this.state.nbCard) {
        console.log('data[currentIndex] :');
        console.log(currentIndex);
        console.log(this.props.data[currentIndex]);

        finalArray.push(this.props.data[currentIndex]);
        console.log(currentIndex === this.props.data.length - 1);

        if (currentIndex === this.props.data.length - 1) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        console.log(finalArray);
        i++;
      }
      console.log(finalArray);
      this.setState({ cardsToBeDisplayed: finalArray });
    }
  };

  static getDerivedStateFromProps(props, state) {
    let resultArray = props.data.filter(
      (item, index) => index >= state.startIndex && index < state.startIndex + state.nbCard
    );
    return { cardsToBeDisplayed: resultArray };
  }

  render() {
    console.log(this.state);
    let title = this.props.source;
    let iconName = this.props.source;
    let icon;

    if (iconName === 'twitter') {
      icon = twitter;
    } else if (iconName === 'reddit') {
      icon = reddit;
    } else if (iconName === 'hacker noon') {
      icon = HackerNoon;
    }

    // if (index >= this.state.startIndex && index < this.state.startIndex + this.state.nbCard) {

    let cardDisplay = this.state.cardsToBeDisplayed.map((post) => {
      return (
        <Grid.Column width={3} key={post.id} id={post.id}>
          <Article key={post.id} id={post.id} data={post} />
        </Grid.Column>
      );
    });

    return (
      <div>
        <br />
        <Responsive>
          <Container fluid className="source">
            <Grid>
              <Grid.Row>
                <Header as="h3" textAlign="left" style={{ textTransform: 'uppercase' }}>
                  {title}
                  <Image className="imageIcon" src={icon} size="mini" />
                </Header>
                <br />
              </Grid.Row>
              <Grid.Row>
                <div className="leftArrow" width={1}>
                  <Button icon="arrow left" onClick={() => this.handleClick('left')} />
                </div>
                {cardDisplay}
                <div className="rightArrow" width={1}>
                  <Button icon="arrow right" onClick={() => this.handleClick('right')} />
                </div>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </div>
    );
  }
}

export default Source;
