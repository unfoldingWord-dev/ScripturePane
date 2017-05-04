import React from 'react';
import {Col, Well, Glyphicon} from 'react-bootstrap';
import style from '../css/Style';
import VerseDisplay from './VerseDisplay';
import CloseButton from './CloseButton';

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
    return (
        <Col md={4} sm={4} xs={4} lg={4} style={id == 0 ? {} : {borderLeft: '1px solid var(--border-color)'} }>
          <div style={style.removePane}
                onClick={() => removePane(id)}>
            <CloseButton />
          </div>
            <span style={style.pane.title}>
              {heading.heading || ''}
            </span>
            <span style={style.headingDescription}>
              {heading.headingDescription || ''}
            </span>

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
        </Col>
    );
  }
}

module.exports = Pane;
