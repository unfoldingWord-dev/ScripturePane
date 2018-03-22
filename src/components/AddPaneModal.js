/**
 * @description This component displays a modal when the user clicks the add
 * resources button on the scripture pane module.
 */
import React from 'react';
import PropTypes from 'prop-types';
import BaseDialog from './BaseDialog';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {FormControl} from 'react-bootstrap';

const styles = {
  icon: {
    color: '#ffffff',
    width: 25,
    height: 25
  },
  iconButton: {
    padding: 0,
    width: 25,
    height: 25,
    marginTop: 5
  },
  title: {
    display: 'flex',
    flexDirection: 'row'
  },
  body: {
    textAlign: 'center'
  },
  select: {
    margin: '0 auto',
    width: '300px'
  }
};

class AddPaneModal extends React.Component {
  render() {
    const { translate, selectSourceLanguage, addPane, show, onHide, selectedPane, currentPaneSettings } = this.props;
    const { bibles } = this.props.resourcesReducer;
    let panes = [];

    // generate a list of resource names for dropdown list.
    Object.keys(bibles).forEach((languageId) => {
      const bibleIds = bibles[languageId];
      Object.keys(bibleIds).forEach((bibleId) => {
        const { language_name, resource_title } = bibles[languageId][bibleId]["manifest"];
        const resourceText = bibleId !== "targetBible" ? " (" + resource_title + ")" : " (Current project)";
        const displayText = language_name + resourceText;
        const foundInCurrentPaneSettings = currentPaneSettings.filter((paneSetting) => {
          return paneSetting.bibleId === bibleId && paneSetting.languageId === languageId;
        }).length > 0;

        panes.push(
          <option
            key={`${languageId}_${bibleId}`}
            value={`${languageId}_${bibleId}`}
            disabled={foundInCurrentPaneSettings}
          >
            {displayText}
          </option>
        );
      });
    });

    const titleText = translate('resources.add_resources');
    const title = (
      <h4>
        <span style={{flexGrow: 1, textAlign: 'center'}}>{titleText}</span>
        <IconButton style={styles.iconButton}
                    iconStyle={styles.icon}
                    onClick={onHide}>
          <CloseIcon/>
        </IconButton>
      </h4>
    );

    return (
      <BaseDialog open={show}
                  title={title}
                  bodyStyle={styles.body}
                  titleStyle={styles.title}
                  primaryLabel={translate('buttons.load_button')}
                  onSubmit={selectedPane ? addPane : null}
                  secondaryLabel={translate('buttons.close_button')}
                  onClose={onHide}>
          <h4 style={{ marginBottom: "30px" }}>
            {translate('resources.select_language')}
          </h4>
          <FormControl
            componentClass="select"
            style={styles.select}
            onChange={e => selectSourceLanguage(e.target.value)}
          >
            <option value="">{translate('resources.select')}</option>
            {panes}
          </FormControl>
      </BaseDialog>
    );
  }
}

AddPaneModal.propTypes = {
  translate: PropTypes.func.isRequired,
  selectSourceLanguage: PropTypes.func.isRequired,
  addPane: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  selectedPane: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      bibleId: PropTypes.string,
      languageId: PropTypes.string
    })
  ]),
  currentPaneSettings: PropTypes.array.isRequired,
  resourcesReducer: PropTypes.object.isRequired
};

export default AddPaneModal;
