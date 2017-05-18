const React = require('react');
const AddBibleSVG = require('./AddBibleSVG');

class AddBible extends React.Component {

  render() {
    let { showModal } = this.props;
    return(
        <div style={{ height: "60px", width: "60px", cursor: 'pointer' }} onClick={showModal}>
          <AddBibleSVG />
        </div>
    )
  }
}

module.exports = AddBible;
