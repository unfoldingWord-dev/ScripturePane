import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
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

    let { direction, language_name, resource_id, description } = bibles && bibles[bibleId] ? bibles[bibleId]["manifest"] : {};
    let verseText = bibles && bibles[bibleId] && bibles[bibleId][reference.chapter] ? bibles[bibleId][reference.chapter][reference.verse] : null;
    let headingText = bibleId !== "targetLanguage" ? language_name + " (" + bibleId.toUpperCase() + ")" : language_name ? language_name : '';
    let contentStyle;
    const PANECHAR = 9;

    if (direction == 'ltr') {
      contentStyle = style.pane.contentLTR;
    } else {
      contentStyle = style.pane.contentRTL;
    }

    return (
      <div style={index > 0 ? style.otherPane : style.firstPane}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <span style={style.pane.title} className={headingText.length > 15 ? 
                "hint--bottom hint--medium" : null} aria-label={headingText}>
              {headingText.length > 15 ? headingText.slice(0, 15) + '...' : headingText}
            </span>
            <ContainerDimensions> 
              {
                ({width}) => 
                <span style={style.pane.subtitle} className={description.length > width/PANECHAR ? 
                    "hint--bottom hint--medium" : null} aria-label={description}>
                  {description.length > width/PANECHAR ? 
                      description.slice(0, Math.round(width/PANECHAR)) + "..." :
                      description}
                </span>
              }
            </ContainerDimensions> 
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
