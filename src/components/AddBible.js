import React from 'react';
import PropTypes from 'prop-types';
import AddBibleSVG from './AddBibleSVG';

class AddBible extends React.Component {

  render() {
    let { showModal } = this.props;
    return(
        <div style={{ height: "60px", width: "60px", cursor: 'pointer' }} title="Click to add a resource" onClick={showModal}>
          <AddBibleSVG />
        </div>
    );
  }
}

AddBible.propTypes = {
  showModal: PropTypes.bool.isRequired
};

export default AddBible;
