import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './Article.css';
import ArticleModal from './ArticleModal.jsx';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleCardClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    let content;

    if (typeof this.props.data.postType === 'undefined') {
      content = this.props.data.text;
    } else if (this.props.data.postType === 'image') {
      content = <img src={this.props.data.thumbnail} alt="" />;
    } else if (this.props.data.postType === 'link') {
      content = (
        <div>
          <img src={this.props.data.thumbnail} alt="" />
          <p>{this.props.data.postUrl}</p>
        </div>
      );
    }

    // Card title definition
    const MAX_TITLE_LENGTH = 20;
    let cardTitle = this.props.data.title.substring(0, MAX_TITLE_LENGTH);
    if (this.props.data.title.length > MAX_TITLE_LENGTH) {
      cardTitle += '...';
    }

    return (
      <div>
        <Card onClick={this.handleCardClick} className="cardstyle">
          <Card.Content>
            <Card.Header className="title">{cardTitle}</Card.Header>
            <Card.Description className="description">{this.props.data.creationDate}</Card.Description>
            <hr />
            <Card.Description>{content}</Card.Description>
            {/*   Commentés car on va les utiliser seulement dans le pop-up            
              <div>
                <Button circular color="facebook" icon="facebook" />
                <Button circular color="twitter" icon="twitter" />
              </div> */}
          </Card.Content>
        </Card>
        <ArticleModal isModalOpen={this.state.isModalOpen} handleModalClose={this.handleModalClose} />
      </div>
    );
  }
}

Article.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Article;
