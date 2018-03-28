import React from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';
import {Glyphicon} from 'react-bootstrap';
import style from '../css/Style';
import Verse from './Verse';
import {getTranslation} from "../helpers/localizationHelpers";

class Pane extends React.Component {
  render() {
    let { translate, removePane, index, bibleId, languageId, resourcesReducer: { bibles } } = this.props;
    let { reference } = this.props.contextIdReducer.contextId;
    let {
      direction,
      language_name,
      resource_id,
      description
    } = bibles && bibles[languageId][bibleId] ? bibles[languageId][bibleId]["manifest"] : {};
    direction = direction || 'ltr';
    description = getTranslation(translate, description || "");
    let verseText = bibles && bibles[languageId][bibleId] && bibles[languageId][bibleId][reference.chapter] ? bibles[languageId][bibleId][reference.chapter][reference.verse] : '';
    let languageName = getTranslation(translate, language_name);
    let headingText = bibleId !== "targetBible" ? languageName + " (" + bibleId.toUpperCase() + ")" : (languageName || '');
    let contentStyle;
    const PANECHAR = 9;

    if (direction === 'ltr') {
      contentStyle = style.pane.contentLTR;
    } else {
      contentStyle = style.pane.contentRTL;
    }

    return (
      <div style={index > 0 ? style.otherPane : style.firstPane}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <span style={style.pane.title} className={headingText.length > 21 ?
                "hint--bottom hint--medium" : null} aria-label={headingText}>
              {headingText.length > 21 ? headingText.slice(0, 21) + '...' : headingText}
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
                     onClick={() => removePane(index)} title={translate("click_remove_resource")} />
        </div>
        <div style={contentStyle}>
          <Verse
            {...this.props}
            verseText={verseText}
            chapter={reference.chapter}
            verse={reference.verse}
            direction={direction}
            bibleId={resource_id}
            languageId={languageId}
            isCurrent={true}
          />
        </div>
      </div>
    );
  }
}

Pane.propTypes = {
  translate: PropTypes.func.isRequired,
  removePane: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  bibleId: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  actions: PropTypes.shape({
    setToolSettings: PropTypes.func.isRequired,
    getWordListForVerse: PropTypes.func.isRequired,
    loadLexiconEntry: PropTypes.func.isRequired,
    showPopover: PropTypes.func.isRequired
  }),
  contextIdReducer: PropTypes.object.isRequired,
  resourcesReducer: PropTypes.object.isRequired

};

export default Pane;
