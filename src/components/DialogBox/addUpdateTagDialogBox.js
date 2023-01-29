import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import get from 'lodash/get';
import trim from 'lodash/trim';
import classes from './styles.scss';

class AddUpdateTagDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            tagname: '',
            isActive: '',
            tagnameErrorLabel: '',
            isActiveErrorLabel: '',
        };
        this.errorMessages = {
            tagNameError: <FormattedMessage id="tagNameError" />,
            isActiveError: <FormattedMessage id="isActiveError" />,
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.validationCheck = this.validationCheck.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }

    componentWillMount() {
        const isActive = get(this.props.selectedData, 'isActive', '');
        const id = get(this.props.selectedData, 'id', 0);
        const tagname = get(this.props.selectedData, 'tagname', '');
        this.setState({ isActive, id, tagname });
    }

    changeHandler(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
                [`${e.target.name}ErrorLabel`]: '',
            },
        );
    }

    handleStatusChange(event, index, isActive) {
        this.setState({ isActive, isActiveErrorLabel: '' });
    }

    validationCheck() {
        const { id, tagname, isActive } = this.state;
        const { selectedData, update } = this.props;
        if (
            trim(tagname) && trim(isActive) &&
            (tagname !== selectedData.tagname || isActive !== selectedData.isActive)
        ) {
            update({ id, tagname, isActive });
        } else {
            if (!trim(tagname)) {
                this.setState({ tagnameErrorLabel: this.errorMessages.tagNameError });
            }
            if (!trim(isActive)) {
                this.setState({ isActiveErrorLabel: this.errorMessages.isActiveError });
            }
        }
    }

    render() {
        const tagnameTextValue = <FormattedMessage id="tagnameText" />;
        const isActiveTextValue = <FormattedMessage id="status" />;
        const {
            tagnameErrorLabel,
            isActiveErrorLabel,
        } = this.state;

        const actionsStatusChange = [
            <RaisedButton
              label={<FormattedMessage id="cancel" />}
              icon={<FontIcon className="material-icons">clear</FontIcon>}
              onTouchTap={this.props.handleCloseDialog()}
              className={classes.button}
            />,
            <RaisedButton
              label={<FormattedMessage id="saveDetails" />}
              primary
              icon={<FontIcon className="material-icons">check</FontIcon>}
              onTouchTap={this.validationCheck}
              style={{ marginLeft: 20 }}
              className={classes.button}
            />,
        ];
        return (
          <Dialog
            title={<h3><FormattedMessage id="tagsHeader" /></h3>}
            actions={actionsStatusChange}
            modal={false}
            open
            onRequestClose={this.props.handleCloseDialog()}
            actionsContainerStyle={{ padding: '0px 20px 25px 20px' }}
            titleStyle={{ paddingBottom: 0 }}
            bodyStyle={{ minHeight: 170 }}
          >
            <TextField
              name="tagname"
              hintText={tagnameTextValue}
              defaultValue={this.state.tagname}
              onChange={this.changeHandler}
              floatingLabelText={tagnameTextValue}
              fullWidth
              errorText={tagnameErrorLabel}
              maxLength="100"
            />
            <SelectField
              floatingLabelText={isActiveTextValue}
              hintText={isActiveTextValue}
              value={this.state.isActive}
              onChange={this.handleStatusChange}
              fullWidth
              errorText={isActiveErrorLabel}
            >
              <MenuItem value={true} primaryText={<FormattedMessage id="enable" />} />
              <MenuItem value={false} primaryText={<FormattedMessage id="disable" />} />
            </SelectField>
          </Dialog>
        );
    }
}

AddUpdateTagDialog.propTypes = {
    update: PropTypes.func.isRequired,
    selectedData: PropTypes.object.isRequired,
    handleCloseDialog: PropTypes.func.isRequired,
};


export default AddUpdateTagDialog;
