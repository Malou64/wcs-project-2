import React, { Component } from 'react';
import './Home.css';
import { Image, Icon, Checkbox, Input, Container } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import logo from '../assets/images/Logo.png';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toSearch: false,
      keyWord: '',
      sourceToggle: {
        twitter: true,
        reddit: true,
        hacker: true,
      },
    };
    this.handleToggleChange = this.handleToggleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputClick = (event) => {
    this.setState({ toSearch: true });
  };

  handleInputChange = (event) => {
    this.setState({ keyWord: event.target.value });
  };

  handleToggleChange = (source) => {
    this.setState((prevState) => {
      let objectReturned = { ...prevState.sourceToggle };
      objectReturned[source] = !objectReturned[source];
      return { sourceToggle: objectReturned };
    });
  };

  render() {
    let redirect = this.state.toSearch && <Redirect to={{ pathname: '/searchpoint', state: this.state }} />;

    return (
      <Container fluid>
        <div className="container">
          {redirect}
          <div className="image">
            <Image src={logo} alt="logo" />
          </div>
          <div className="title">
            <h1 style={{ textAlign: 'center' }}>Welcome !</h1>
          </div>
          <div className="input">
            <Input
              placeholder="Search..."
              icon={{ name: 'search', circular: true, link: true, onClick: () => this.handleInputClick() }}
              value={this.state.keyWord}
              onChange={this.handleInputChange}
              onKeyPress={(event) => event.key === 'Enter' && this.handleInputClick()}
              autoFocus={true}
            />
          </div>
          <div className="checkbox">
            <Icon className="twitter" color="blue" />
            <Checkbox toggle defaultChecked={true} onChange={() => this.handleToggleChange('twitter')} />
            <Icon className="reddit alien" color="red" />
            <Checkbox toggle defaultChecked={true} onChange={() => this.handleToggleChange('reddit')} />
            <Icon className="moon" color="green" />
            <Checkbox toggle defaultChecked={true} onChange={() => this.handleToggleChange('hacker')} />
          </div>
        </div>
      </Container>
    );
  }
}

export default Home;
