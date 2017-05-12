import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import style from '../css/Style';
import VerseDisplay from './VerseDisplay';

class Pane extends React.Component {
  render() {
    let {
      content,
      greek,
      removePane,
      heading,
      id,
      dir,
      isGatewayLanguage,
      actions
    } = this.props;
    let {
      showPopover
    } = actions;
    let contentStyle;
    if (dir == 'ltr') {
      contentStyle = style.pane.contentLTR;
    } else {
      contentStyle = style.pane.contentRTL;
    }
    let headingText = heading.resource_id ? heading.language_name + " (" + heading.resource_id.toUpperCase() + ")" : heading.language_name;

    return (
        <div style={id > 0 ? style.otherPane : style.firstPane}>
          <div style={style.verseTitle}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={style.pane.title}>
                {headingText}
              </span>
              <span style={style.headingDescription}>
                {heading.headingDescription || ''}
              </span>
            </div>
            <Glyphicon glyph={"remove"} style={{color: "var(--text-color-light)", cursor: 'pointer'}}
                       onClick={() => removePane(id)} title="Click to remove pane"/>
          </div>
          <div style={contentStyle}>
            <VerseDisplay
                {...this.props}
                chapter={this.props.contextId.reference.chapter}
                verse={this.props.contextId.reference.verse}
                input={content}
                greek={greek}
                isGatewayLanguage = {isGatewayLanguage}
                showPopover={showPopover}
            />
          </div>
        </div>
    );
  }
}

module.exports = Pane;
