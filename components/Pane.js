import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import style from '../css/Style';
import Verse from './Verse';
import {bibleIdFromSourceName} from '../helpers/bibleHelpers';

class Pane extends React.Component {
  render() {
    let { removePane, index, paneSettings } = this.props;
    let { showPopover } = this.props.actions;
    let { dir, sourceName, heading } = paneSettings;
    let { reference } = this.props.contextIdReducer.contextId;
    let { bibles } = this.props.resourcesReducer;

    // look up verseText
    let bibleId = bibleIdFromSourceName(sourceName);
    let verseText = bibles[bibleId][reference.chapter][reference.verse];

    let contentStyle;
    if (dir == 'ltr') {
      contentStyle = style.pane.contentLTR;
    } else {
      contentStyle = style.pane.contentRTL;
    }
    let headingText = heading.resource_id ? heading.language_name + " (" + heading.resource_id.toUpperCase() + ")" : heading.language_name;

    return (
      <div style={index > 0 ? style.otherPane : style.firstPane}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={style.pane.title}>
              {headingText}
            </span>
            <span style={style.pane.subtitle}>
              {heading.headingDescription || ''}
            </span>
          </div>
          <Glyphicon glyph={"remove"} style={{color: "var(--text-color-light)", cursor: 'pointer'}}
                     onClick={() => removePane(index)} title="Click to remove resource"/>
        </div>
        <div style={contentStyle}>
          <Verse
            {...this.props}
            verseText={verseText}
            chapter={reference.chapter}
            verse={reference.verse}
            dir={dir}
            sourceName={sourceName}
            isCurrent={true}
          />
        </div>
      </div>
    );
  }
}

module.exports = Pane;
