/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// components
import BibleHeadingsRow from './BibleHeadingsRow';
import VerseRow from './VerseRow';
import VerseEditorDialog from '../VerseEditorDialog';

class ChapterView extends React.Component {

  constructor(props) {
    super(props);
    this.handleEditTargetVerse = this.handleEditTargetVerse.bind(this);
    this.handleEditorCancel = this.handleEditorCancel.bind(this);
    this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
    this.state = {
      editVerse: null
    };
  }

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

  /**
   * Handles events to edit the target verse
   * @param bibleId
   * @param chapter
   * @param verse
   * @param verseText
   */
  handleEditTargetVerse(bibleId, chapter, verse, verseText) {
    this.setState({
      editVerse: {
        bibleId,
        chapter,
        verse,
        verseText
      }
    });
  }

  handleEditorSubmit(originalVerse, newVerse, reasons) {
    const { actions: { editTargetVerse }} = this.props;
    const {editVerse} = this.state;
    if(editVerse === null) return;
    const {chapter, verse} = editVerse;
    if(typeof editTargetVerse === 'function') {
      editTargetVerse(chapter, verse, originalVerse, newVerse, reasons);
    } else {
      console.warn('Unable to edit verse. Callback is not a function.');
    }
    this.setState({
      editVerse: null
    });
  }

  handleEditorCancel() {
    this.setState({
      editVerse: null
    });
  }

  render() {
    const {translate, resourcesReducer, contextIdReducer, actions, selectionsReducer, scripturePane, showModal, projectDetailsReducer} = this.props;
    let {bibles} = resourcesReducer;
    let {chapter} = contextIdReducer.contextId.reference;
    let verseNumbers = Object.keys(bibles['en']['ult'][chapter]);

    this.verseRefs = {};

    // for verses in chapter
    let verseRows = <div/>;
    if (verseNumbers.length > 0) {
      verseRows = verseNumbers.map(verseNumber => {
        const refKey = ChapterView.makeRefKey(chapter, verseNumber);
        return (
          <VerseRow key={verseNumber}
                    verseNumber={verseNumber}
                    onEditTargetVerse={this.handleEditTargetVerse}
                    actions={actions}
                    selectionsReducer={selectionsReducer}
                    scripturePane={scripturePane}
                    resourcesReducer={resourcesReducer}
                    contextIdReducer={contextIdReducer}
                    projectDetailsReducer={projectDetailsReducer}
                    ref={node => this.verseRefs[refKey] = node} />
        );
      });
    }

    const {editVerse} = this.state;
    const openEditor = editVerse !== null;
    let verseTitle = '';
    let verseText = '';
    if(openEditor) {
      const bookName = projectDetailsReducer.manifest.target_language.book.name;
      verseTitle = `${bookName} ${editVerse.chapter}:${editVerse.verse}`;
      verseText = editVerse.verseText;
    }

    return (
      <div>
        <div style={{width: '100%', height: '100%'}}>
          <BibleHeadingsRow scripturePane={scripturePane}
                            resourcesReducer={resourcesReducer}
                            projectDetailsReducer={projectDetailsReducer}
                            showModal={showModal} />
          <div style={{overflowY: 'scroll', overflowX: 'hidden', height: '310px'}}>
            {verseRows}
          </div>
        </div>
        <VerseEditorDialog translate={translate}
                           onSubmit={this.handleEditorSubmit}
                           open={openEditor}
                           onCancel={this.handleEditorCancel}
                           verseText={verseText}
                           verseTitle={verseTitle}/>
      </div>

    );
  }
}

ChapterView.propTypes = {
  translate: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  scripturePane: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired
};

export default ChapterView;
