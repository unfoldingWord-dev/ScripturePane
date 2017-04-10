import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from '../css/Style';
import VerseDisplay from './VerseDisplay';
import { Col } from 'react-bootstrap';

class ExpandedPane extends Component {
  componentDidMount() {
    console.log(this.refs)
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
    for (var verseNum in currentChapter) {
      let versePaneStyle = {};
      if (verseNum == contextIdReducer.contextId.reference.verse) {
        if (verseNum % 2 == 0) {
          versePaneStyle = {borderLeft: '3px solid #2196F3', backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
        } else {
          versePaneStyle = {borderLeft: '3px solid #2196F3', marginTop: '10px', color: '#000000', padding: '10px'}
        }
      } else if (verseNum % 2 == 0) {
        versePaneStyle = {backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
      } else {
        versePaneStyle = {marginTop: '10px', color: '#000000', padding: '10px'}
      }
      displayContent.push(
        <Col key={verseNum} md={12} sm={12} xs={12} lg={12} style={versePaneStyle}>
          <VerseDisplay
            {...this.props}
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
      <Col md={4} sm={4} xs={4} lg={4} style={{borderRight: '1px solid #95989A', backgroundColor: '#FFFFFF', padding: '0px'}}>
        <Col md={12} sm={12} xs={12} lg={12} style={{ padding: '10px', backgroundColor: 'white'}}>
          <span style={{ fontSize: '16px', color: '#000000', fontWeight: 'bold' }}>
            {paneInfo.heading.heading}
          </span>
        </Col><br />
        <Col md={12} sm={12} xs={12} lg={12} style={{overflowY: 'scroll', height: '500px'}}>
          {displayContent}
        </Col>

      </Col>
    );
  }
}

module.exports = ExpandedPane;
