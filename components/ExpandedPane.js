const api = window.ModuleApi;
import React, { Component } from 'react';
const RB = api.ReactBootstrap;
const { Row, Col } = RB;
const style = require('../css/Style');
const VerseDisplay = require('./VerseDisplay');

class ExpandedPane extends Component {
  componentDidMount(){
    let currentChapterNumber = this.props.currentCheck.chapter;
    let verseNum = this.props.currentCheck.verse;
    let verseReference = currentChapterNumber.toString() + verseNum.toString();
    let currentVerse = this.refs[verseReference];
    let element = api.findDOMNode(currentVerse);
    if (element) {
      element.scrollIntoView();
    }
  }
  render() {
    let { currentCheck, paneInfo } = this.props;
    let displayContent = [];
    let currentChapterNumber = currentCheck.chapter;
    let greek = paneInfo.sourceName === "originalLanguage" ? true : false;
    let isGatewayLanguage = paneInfo.sourceName === "gatewayLanguage" ? true : false;
    let currentChapter = paneInfo.content[currentChapterNumber];
    for(var verseNum in currentChapter){
      let versePaneStyle = {};
      if(verseNum == currentCheck.verse){
        if(verseNum % 2 == 0){
          versePaneStyle = {borderLeft: '3px solid #2196F3', backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
        }else{
          versePaneStyle = {borderLeft: '3px solid #2196F3', marginTop: '10px', color: '#000000', padding: '10px'}
        }
      }else if (verseNum % 2 == 0) {
        versePaneStyle = {backgroundColor: '#e7e7e7', marginTop: '10px', color: '#000000', padding: '10px'}
      }else{
        versePaneStyle =  {marginTop: '10px', color: '#000000', padding: '10px'}
      }
      displayContent.push(
        <Col key={verseNum} md={12} sm={12} xs={12} lg={12} style={versePaneStyle}>
          <VerseDisplay
            chapter={currentChapterNumber}
            verse={verseNum}
            input={paneInfo.content}
            greek={greek}
            isGatewayLanguage={isGatewayLanguage}
            currentCheck={currentCheck}
            ref={currentChapterNumber.toString() + verseNum.toString()}
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
