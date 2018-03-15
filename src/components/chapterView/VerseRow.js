import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import Verse from '../Verse';

class VerseRow extends React.Component {

  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(bibleId, chapter, verse, verseText) {
    const {onEditTargetVerse} = this.props;
    if(bibleId === 'targetBible' && typeof onEditTargetVerse === 'function') {
      onEditTargetVerse(bibleId, chapter, verse, verseText);
    }
  }

  render() {
    const {verseNumber, actions, resourcesReducer, contextIdReducer, selectionsReducer} = this.props;
    const {bibles} = resourcesReducer;
    const {currentPaneSettings} = this.props.settingsReducer.toolsSettings.ScripturePane;
    const {chapter, verse} = this.props.contextIdReducer.contextId.reference;
    const isCurrent = verseNumber === verse.toString();
    let verseCells = <div />;
    let colStyle = {
      alignItems: 'stretch', padding: '10px', paddingTop: '20px',
      borderRight: '1px solid var(--border-color)'
    };
    let isGrayVerseRow = false;
    let rowStyle = { display: 'flex', margin: '0', color: 'var(--text-color-dark)' };
    if (verseNumber % 2 === 0) {
      rowStyle.backgroundColor = 'var(--background-color-light)';
      isGrayVerseRow = true;
    }

    if (isCurrent) colStyle.borderLeft = '3px solid var(--accent-color)';
    if (currentPaneSettings.length > 0) {
      verseCells = currentPaneSettings.map((paneSetting, index) => {
        const languageId = paneSetting.languageId;
        const bibleId = paneSetting.bibleId;
        const manifest = bibles[languageId][bibleId].manifest;
        const verseText = bibles[languageId][bibleId][chapter] ? bibles[languageId][bibleId][chapter][verseNumber] : null;
        let direction = manifest.direction;
        // TODO: is this line right?
        if (bibleId === 'targetLanguage') {
          direction = this.props.projectDetailsReducer.manifest.target_language.direction;
        }

        return (
          <Col key={index} md={4} sm={4} xs={4} lg={4} style={colStyle}>
            <Verse
              onEdit={this.handleEdit}
              resourcesReducer={resourcesReducer}
              contextIdReducer={contextIdReducer}
              selectionsReducer={selectionsReducer}
              actions={actions}
              sourceName={bibleId}
              bibleId={bibleId}
              isCurrent={isCurrent}
              verseText={verseText}
              chapter={chapter}
              verse={verseNumber}
              direction={direction}
              isGrayVerseRow={isGrayVerseRow}
            />
          </Col>
        );
      });
    }

    return (
      <Row style={rowStyle}>
        {verseCells}
      </Row>
    );
  }
}

VerseRow.propTypes = {
  onEditTargetVerse: PropTypes.func,
  selectionsReducer: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  verseNumber: PropTypes.string.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired
};

export default VerseRow;
