import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';
import style from '../css/Style';
import VerseDisplay from './VerseDisplay';


class ExpandedPane extends Component {

  componentDidMount() {
    let {contextIdReducer} = this.props;
    let chapterNumber = contextIdReducer.contextId.reference.chapter;
    let verseNumber = contextIdReducer.contextId.reference.verse;
    let verseReference = chapterNumber.toString() + verseNumber.toString();
    let currentVerse = this.refs[verseReference];
    let element = ReactDOM.findDOMNode(currentVerse);
    if (element) {
      element.scrollIntoView();
    }
  }

  render() {
    let { contextIdReducer, paneInfo, bibles } = this.props;
    let displayContent = [];
    let chapterNumber = contextIdReducer.contextId.reference.chapter;
    let greek = paneInfo.sourceName === "originalLanguage" ? true : false;
    let isGatewayLanguage = paneInfo.sourceName === "gatewayLanguage" ? true : false;
    let currentChapter = bibles[paneInfo.sourceName][chapterNumber];
    let dir = "ltr";

    if (paneInfo.sourceName === "targetLanguage") {
      dir = this.props.projectDetailsReducer.manifest.target_language.direction
    }
    for (var verseNum in currentChapter) {
      let versePaneStyle = {};
      if (verseNum == contextIdReducer.contextId.reference.verse) {
        if (verseNum % 2 == 0) {
          versePaneStyle = {borderLeft: '3px solid var(--accent-color)', backgroundColor: 'var(--background-color-light)', marginTop: '10px', color: 'var(--text-color-dark)', padding: '10px'}
        } else {
          versePaneStyle = {borderLeft: '3px solid var(--accent-color)', marginTop: '10px', color: 'var(--text-color-dark)', padding: '10px'}
        }
      } else if (verseNum % 2 == 0) {
        versePaneStyle = {backgroundColor: 'var(--background-color-light)', marginTop: '10px', color: 'var(--text-color-dark)', padding: '10px'}
      } else {
        versePaneStyle = {marginTop: '10px', color: 'var(--text-color-dark)', padding: '10px'}
      }

      displayContent.push(
        <Col key={verseNum} md={12} sm={12} xs={12} lg={12} style={versePaneStyle}>
          <VerseDisplay
            {...this.props}
            dir={dir}
            chapter={chapterNumber}
            verse={verseNum}
            input={bibles[paneInfo.sourceName]}
            greek={greek}
            isGatewayLanguage={isGatewayLanguage}
            contextIdReducer={contextIdReducer}
            ref={chapterNumber.toString() + verseNum.toString()}
          />
        </Col>
      );
    }

    return (
      <Col md={4} sm={4} xs={4} lg={4} style={{borderRight: '1px solid var(--border-color)', backgroundColor: 'var(--reverse-color)', padding: '0px'}}>
        <Col md={12} sm={12} xs={12} lg={12} style={{ padding: '10px', backgroundColor: 'var(--reverse-color)', height: "70px", borderBottom: "3px solid var(--border-color)"}}>
          <span style={{ fontSize: '16px', color: 'var(--text-color-dark)', fontWeight: 'bold' }}>
            {paneInfo.heading.heading}
          </span>
        </Col><br />
        <Col md={12} sm={12} xs={12} lg={12} style={{overflowY: 'scroll', height: '480px'}}>
          {displayContent}
        </Col>
      </Col>
    );
  }
}

export default ExpandedPane;
