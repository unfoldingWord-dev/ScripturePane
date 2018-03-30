import React from 'react';
import PropTypes from 'prop-types';
import AddBibleSVG from './AddBibleSVG';

class AddBible extends React.Component {

  render() {
    let { showModal, translate } = this.props;
    return(
        <div style={{ height: "60px", width: "60px", cursor: 'pointer' }} title={translate("click_add_resource")} onClick={showModal}>
          <AddBibleSVG />
        </div>
    );
  }
}

AddBible.propTypes = {
  translate: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

export default AddBible;
