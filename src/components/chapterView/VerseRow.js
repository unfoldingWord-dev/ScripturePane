import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row} from 'react-bootstrap';
import Verse from '../Verse';

class VerseRow extends React.Component {

  render() {
    let {verseNumber} = this.props;
    let {bibles} = this.props.resourcesReducer;
    let {currentPaneSettings} = this.props.settingsReducer.toolsSettings.ScripturePane;
    let {chapter, verse} = this.props.contextIdReducer.contextId.reference;
    let verseCells = <div />;
    let colStyle = {
      alignItems: 'stretch', padding: '10px', paddingTop: '20px',
      borderRight: '1px solid var(--border-color)'
    };
    let isCurrent = verseNumber === verse.toString();

    if (isCurrent) colStyle.borderLeft = '3px solid var(--accent-color)';
    if (currentPaneSettings.length > 0) {
      verseCells = currentPaneSettings.map((bibleId, index) => {
        let manifest = bibles[bibleId].manifest;
        let verseText = bibles[bibleId][chapter] ? bibles[bibleId][chapter][verseNumber] : null;
        let direction = manifest.direction;
        if (bibleId === 'targetLanguage') {
          direction = this.props.projectDetailsReducer.manifest.target_language.direction;
        }

        return (
          <Col key={index} md={4} sm={4} xs={4} lg={4} style={colStyle}>
            <Verse
              {...this.props}
              sourceName={bibleId}
              bibleId={bibleId}
              isCurrent={isCurrent}
              verseText={verseText}
              chapter={chapter}
              verse={verseNumber}
              direction={direction}
            />
          </Col>
        );
      });
    }

    let rowStyle = { display: 'flex', margin: '0', color: 'var(--text-color-dark)' };
    if (verseNumber % 2 === 0) rowStyle.backgroundColor = 'var(--background-color-light)';

    return (
      <Row style={rowStyle}>
        {verseCells}
      </Row>
    );
  }
}

VerseRow.propTypes = {
  verseNumber: PropTypes.string.isRequired,
  settingsReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  contextIdReducer: PropTypes.object.isRequired,
  projectDetailsReducer: PropTypes.object.isRequired
};

export default VerseRow;
