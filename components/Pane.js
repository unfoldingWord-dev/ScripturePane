import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import style from '../css/Style';
import Verse from './Verse';
// import {bibleIdFromSourceName} from '../helpers/bibleHelpers';

class Pane extends React.Component {
  render() {
    let { removePane, index, bibleId } = this.props;
    let { showPopover } = this.props.actions;
    let { reference } = this.props.contextIdReducer.contextId;
    let { bibles } = this.props.resourcesReducer;

    let { direction, language_name, resource_id, description } = bibles[bibleId]["manifest"];
    // look up verseText
    let verseText = bibles[bibleId][reference.chapter][reference.verse];
    let headingText = bibleId !== "targetLanguage" ? language_name + " (" + bibleId.toUpperCase() + ")" : language_name;
    let contentStyle;

    if (direction == 'ltr') {
      contentStyle = style.pane.contentLTR;
    } else {
      contentStyle = style.pane.contentRTL;
    }

    return (
      <div style={index > 0 ? style.otherPane : style.firstPane}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={style.pane.title}>
              {headingText}
            </span>
            <span style={style.pane.subtitle}>
              {description || ''}
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
            direction={direction}
            bibleId={resource_id}
            isCurrent={true}
          />
        </div>
      </div>
    );
  }
}

export default Pane;
