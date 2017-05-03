const React = require('react');
const api = window.ModuleApi;
const RB = api.ReactBootstrap;
const { Col } = RB;
const AddBibleSVG = require('./AddBibleSVG');

class AddBible extends React.Component {

  render() {
    let { scripturePane, showModal, id } = this.props;
    return(
      <Col md={4} sm={4} xs={4} lg={4} className="fill-height" style={id == 1 ? {position: 'relative', padding: '65px'} : {borderLeft: '1px solid var(--border-color)', position: 'relative', padding: '65px'}}>
        <div style={{ height: "60px", cursor: 'pointer' }} onClick={showModal}>
          <AddBibleSVG />
        </div>
      </Col>
    )
  }
}

module.exports = AddBible;
