import React from 'react';
import {Col, Row} from 'react-bootstrap';
import Verse from './Verse';

class VerseRow extends React.Component {

  render() {
    let {verseNumber} = this.props;
    let {bibles} = this.props.resourcesReducer;
    let {currentPaneSettings} = this.props.modulesSettingsReducer.ScripturePane;
    let {chapter, verse} = this.props.contextIdReducer.contextId.reference;

    // if required data, then populate verse
    let verseCells = <div />;
    let colStyle = {
      alignItems: 'stretch', padding: '10px', paddingTop: '20px',
      borderRight: '1px solid var(--border-color)'
    };
    let isCurrent = verseNumber == verse;
    if (isCurrent) colStyle.borderLeft = '3px solid var(--accent-color)';
    if (currentPaneSettings.length > 0) {
      verseCells = currentPaneSettings.map(resource => {
        let verseText = bibles[resource.sourceName][chapter][verseNumber];
        let dir = resource.dir;
        if (resource.sourceName === "targetLanguage") {
          dir = this.props.projectDetailsReducer.manifest.target_language.direction
        }

        return (
          <Col key={resource.sourceName} md={4} sm={4} xs={4} lg={4} style={colStyle}>
            <Verse {...this.props}
              sourceName={resource.sourceName}
              isCurrent={isCurrent}
              verseText={verseText}
              chapter={chapter}
              verse={verseNumber}
              dir={dir}
            />
          </Col>
        )
      });
    }

    let rowStyle = { display: 'flex', margin: '0', color: 'var(--text-color-dark)' };
    if (verseNumber % 2 === 0) rowStyle.backgroundColor = 'var(--background-color-light)';

    return (
      <Row style={rowStyle}>
        {verseCells}
      </Row>
    )
  }
}

export default VerseRow;
