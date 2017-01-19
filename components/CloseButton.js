const React = api.React;
const {Glyphicon} = api.ReactBootstrap;

class CloseButton extends React.Component{
    constructor(){
      super();
      this.state = {
        hover: false
      }
      this.toggleHover = this.toggleHover.bind(this);
    }

    toggleHover(){
      this.setState({
        hover: !this.state.hover
      });
    }

    render(){
      return(
        <Glyphicon glyph={"remove"} style={{color: this.state.hover ? "red":"black"}}
          onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}/>
      )
    }
}

module.exports = CloseButton;
