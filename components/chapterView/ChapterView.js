import React from 'react';
import ReactDOM from 'react-dom';
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
    let verseNumbers = Object.keys(bibles['ugnt'][chapter]);

    // for verses in chapter
    let verseRows = <div/>;
    if (verseNumbers.length > 0) {
      verseRows = verseNumbers.map(verseNumber => {
        return (
          <VerseRow {...this.props} verseNumber={verseNumber} key={verseNumber} ref={chapter.toString() + verseNumber.toString()} />
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
    )
  }
}

export default ChapterView;
