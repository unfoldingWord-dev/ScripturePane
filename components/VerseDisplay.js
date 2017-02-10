/**
 * @author: Manny Colon
 * @description: This Component generates the current verse to be displayed
 *               and updates on to 'goToVerse' event
 ******************************************************************************/

const api = window.ModuleApi;
const React = api.React;

class VerseDisplay extends React.Component {
  /**
   * @description - This handles the verse that will be display in the pane in
   * the greek language. it generates Popover with Lexicon info about eahc word.
   * @param {Object} text - The current verse.
   * @return {String} - The current verse.
   ******************************************************************************/
  displayGreek(text = []) {
    let i = 0;
    return text.map((word) => {
      var PopoverTitle = <span>
                           {word.word + " | "}
                           <a href={'http://studybible.info/mac/' + word.speech}
                              target="_blank">
                             <b>
                              {word.speech}
                             </b>
                           </a>
                         </span>
      return (<span
                key={i++}
                strong={word.strong}
                style={{cursor: 'pointer'}}
                speech={word.speech}
                onClick={function(e){
                  var x = e.target.getBoundingClientRect().left;
                  var y = e.target.getBoundingClientRect().bottom;
                  api.Popover(true, PopoverTitle, word.brief, x, y);
                }}>
                  {word.word + " "}
                </span>
              );
    });
  }

  render() {
    let content = "";
    let verseNumber = this.props.verse;
    let chapterNumber = this.props.chapter;
    let toHighlight = this.props.currentCheck.phrase ? this.props.currentCheck.phrase : this.props.currentCheck.groupName;
    let phrase = this.props.currentCheck.phrase;
    let word = this.props.currentCheck.groupName;
    if(this.props.input){
      if(this.props.greek){
        var greekVerse =  this.props.input[chapterNumber][verseNumber];
        content = this.displayGreek(greekVerse);
      }else{
        var list = this.props.input;
        try {
          content = list[chapterNumber][verseNumber];
        } catch (err) {
          // Happens when the file is not complete
        }
      }
    }else {
      console.warn("The prop input is undefined");
    }

    if(content.includes(phrase)){
      toHighlight = phrase;
    } else {
      toHighlight = word;
    }

    if(this.props.isGatewayLanguage && !toHighlight.includes("...")){
        let contentArray = content.split(toHighlight);
        let newContent = [];
        for(let i in contentArray){
          if(i < (contentArray.length - 1)){
            newContent.push(
              <span key={i}>
              <span>
                {contentArray[i]}
              </span>
              <span style={{backgroundColor: "#FDD910"}}>
                {toHighlight}
              </span>
            </span>
            );
          }else {
            newContent.push(
              <span key={i}>
              {contentArray[i]}
              </span>
            );
          }
        }
      return (
        <div>
          <b>{chapterNumber + ":" + verseNumber + " "}</b>
          {newContent}
        </div>
      )
    }
    return (
      <div>
        <b>{chapterNumber + ":" + verseNumber + " "}</b>
        {content}
      </div>
    );
  }
}

 module.exports = VerseDisplay;
