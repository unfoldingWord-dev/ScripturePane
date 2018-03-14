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
    let verseReference = ChapterView.makeRefKey(chapter, verse);
    let currentVerse = this.verseRefs[verseReference];
    let element = ReactDOM.findDOMNode(currentVerse);
    if (element) element.scrollIntoView();
  }

  /**
   * Generates a key to use for verse ref's
   * @param chapter
   * @param verse
   * @return {string}
   */
  static makeRefKey(chapter, verse) {
    return `c${chapter.toString()}v${verse.toString()}`;
  }

  render() {
    const {resourcesReducer, contextIdReducer, actions, selectionsReducer, settingsReducer, showModal, projectDetailsReducer} = this.props;
    let {bibles} = this.props.resourcesReducer;
    let {chapter} = this.props.contextIdReducer.contextId.reference;
    let verseNumbers = Object.keys(bibles['en']['ulb'][chapter]);

    this.verseRefs = {};

    // for verses in chapter
    let verseRows = <div/>;
    if (verseNumbers.length > 0) {
      verseRows = verseNumbers.map(verseNumber => {
        const refKey = ChapterView.makeRefKey(chapter, verseNumber);
        return (
          <VerseRow key={verseNumber}
                    verseNumber={verseNumber}
                    actions={actions}
                    selectionsReducer={selectionsReducer}
                    settingsReducer={settingsReducer}
                    resourcesReducer={resourcesReducer}
                    contextIdReducer={contextIdReducer}
                    projectDetailsReducer={projectDetailsReducer}
                    ref={node => this.verseRefs[refKey] = node} />
        );
      });
    }

    return (
      <div style={{width: '100%', height: '100%'}}>
        <BibleHeadingsRow settingsReducer={settingsReducer}
                          resourcesReducer={resourcesReducer}
                          projectDetailsReducer={projectDetailsReducer}
                          showModal={showModal} />
        <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '430px'}}>
          {verseRows}
        </div>
      </div>
    );
  }
}

ChapterView.propTypes = {
  actions: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired
};

export default ChapterView;
