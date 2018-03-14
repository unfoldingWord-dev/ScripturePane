/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// components
import BibleHeadingsRow from './BibleHeadingsRow';
import VerseRow from './VerseRow';

class ChapterView extends React.Component {

  componentDidMount() {
    let {chapter, verse} = this.props.contextIdReducer.contextId.reference;
    let verseReference = chapter.toString() + verse.toString();
    let currentVerse = this.refs[verseReference];
    let element = ReactDOM.findDOMNode(currentVerse);
    if (element) element.scrollIntoView();
  }

  render() {
    let {bibles} = this.props.resourcesReducer;
    let {chapter} = this.props.contextIdReducer.contextId.reference;
    let verseNumbers = Object.keys(bibles['en']['ult'][chapter]);

    // for verses in chapter
    let verseRows = <div/>;
    if (verseNumbers.length > 0) {
      verseRows = verseNumbers.map(verseNumber => {
        return (
          <VerseRow {...this.props} key={verseNumber} verseNumber={verseNumber} ref={`${chapter.toString()}${verseNumber.toString()}`} />
        );
      });
    }

    return (
      <div style={{width: '100%', height: '100%'}}>
        <BibleHeadingsRow {...this.props} />
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '430px'}}>
          {verseRows}
        </div>
      </div>
    );
  }
}

ChapterView.propTypes = {
  contextIdReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired
};

export default ChapterView;
