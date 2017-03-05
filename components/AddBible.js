const React = require('react');
const api = window.ModuleApi;
const RB = api.ReactBootstrap;
const { Col } = RB;
const AddBibleSVG = require('./AddBibleSVG');

class AddBible extends React.Component {

  render() {
    let { scripturePane, showModal, id } = this.props;
    return(
      <Col md={4} sm={4} xs={4} lg={4} className="fill-height" style={id == 3 ? {position: 'relative', padding: '8.7%'} : {borderRight: '1px solid #95989A', position: 'relative', padding: '8.7%'}}>
        <div style={{ height: "60px", cursor: 'pointer' }} onClick={showModal}>
          <AddBibleSVG />
          <h5 style={{ marginTop: '0px', textAlign: "center", color: "#989898", fontWeight: "bold" }}>
            Add Bible
          </h5>
        </div>
      </Col>
    )
  }
}

module.exports = AddBible;
