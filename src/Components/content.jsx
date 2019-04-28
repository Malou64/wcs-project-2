import React from 'react';
import { Responsive } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Source from './source.jsx';
import styles from './content.module.css';

const Content = ({ sourceToggles, redditData, twitterData, hackerNoonData }) => {
  let resultTwitter;
  let resultReddit;
  let resultHacker;

  sourceToggles.twitter ? (resultTwitter = '') : (resultTwitter = 'Content-toggle');
  sourceToggles.reddit ? (resultReddit = '') : (resultReddit = 'Content-toggle');
  sourceToggles.hacker ? (resultHacker = '') : (resultHacker = 'Content-toggle');

  return (
    <div className={styles.sourceContent}>
      <div className={resultReddit}>
        <Responsive className={styles.source}>
          <Source source="reddit" data={redditData} />
        </Responsive>
      </div>
      <div className={resultTwitter}>
        <Responsive className={styles.source}>
          <Source source="twitter" data={twitterData} />
        </Responsive>
      </div>
      <div className={resultHacker}>
        <Responsive className={styles.source}>
          <Source source="hacker noon" data={hackerNoonData} />
        </Responsive>
      </div>
    </div>
  );
};

Content.propTypes = {
  sourceToggles: PropTypes.object.isRequired,
  redditData: PropTypes.arrayOf(PropTypes.object).isRequired,
  twitterData: PropTypes.arrayOf(PropTypes.object).isRequired,
  hackerNoonData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Content;
