import React from 'react';
import { Card } from 'semantic-ui-react';
import './Article.css';
import ArticleModal from './ArticleModal.jsx';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleClick = () => {
    this.setState({ open: true });
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
          <p>this.props.data.postUrl</p>
        </div>
      );
    }

    return (
      <div>
        <Card onClick={this.handleClick} className="cardstyle">
          <Card.Content>
            <Card.Header className="title">{this.props.data.title}</Card.Header>
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
        <ArticleModal open={this.state.open} />
      </div>
    );
  }
}

export default Article;
