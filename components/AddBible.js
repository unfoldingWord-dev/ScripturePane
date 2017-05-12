const React = require('react');
const AddBibleSVG = require('./AddBibleSVG');
import style from '../css/Style';

class AddBible extends React.Component {

  render() {
    let { showModal, id } = this.props;
    return(
      <div style={id > 0 ? style.otherBible : style.firstBible}>
        <div style={{ height: "60px", width: "60px", cursor: 'pointer' }} onClick={showModal}>
          <AddBibleSVG />
        </div>
      </div>
    )
  }
}

module.exports = AddBible;
