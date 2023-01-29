import React, { Component, PropTypes } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { TextField, SelectField, RaisedButton, MenuItem, FontIcon } from 'material-ui';
import classnames from 'classnames';
import trim from 'lodash/trim';
import classes from '../../containers/MetaTagManagement/styles.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            selectedOption: '',
            onSubmitError: '',
            enableReset: false,
        };
        this.errorMessages = {
            searchError: <FormattedMessage id="searchSubmitError" />,
        };
        this.setMessageTimer = 0;
        this.handleChange = this.handleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.validate = this.validate.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    componentWillUnmount() {
        clearTimeout(this.setMessageTimer);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, onSubmitError: '' });
    }

    handleStatusChange(e, index, selectedOption) {
        this.setState({ selectedOption, onSubmitError: '' });
    }

    validate() {
        const { search, selectedOption } = this.state;
        if (trim(search) || selectedOption) {
            this.setState({ onSubmitError: '', enableReset: true });
            this.props.searching(selectedOption, search);
        } else {
            this.setState({ onSubmitError: this.errorMessages.searchError });
            clearTimeout(this.setMessageTimer);
            this.setMessageTimer = setTimeout(() => this.setState({ onSubmitError: '' }), 10000);
        }
    }

    resetSearch() {
        this.setState({
            search: '',
            selectedOption: '',
            onSubmitError: '',
            enableReset: false,
        }, () => {
            const { search, selectedOption } = this.state;
            this.props.searching(selectedOption, search);
        });
    }

    render() {
        const { searchFloatingText, searchHintText, dropDownText, selectMenuList, intl, menuStyle, menuItemStyle } = this.props;
        const { enableReset, onSubmitError } = this.state;
        const selectFieldText = <FormattedMessage id={dropDownText} />;

        if (!selectMenuList.length) {
            return null;
        }

        return (
          <div className={classnames('row', classes.main)}>
            <div className="col-xs-12 col-sm-6 col-md-3">
              <TextField
                name="search"
                onChange={this.handleChange}
                value={this.state.search}
                floatingLabelText={<FormattedMessage id={searchFloatingText} />}
                hintText={<FormattedMessage id={searchHintText} />}
                fullWidth
              />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
              <SelectField
                floatingLabelText={selectFieldText}
                hintText={selectFieldText}
                value={this.state.selectedOption}
                onChange={this.handleStatusChange}
                menuStyle={menuStyle}
                menuItemStyle={menuItemStyle}
                fullWidth
              >
                {selectMenuList.map(menuItem => (
                  <MenuItem
                    key={`${menuItem.description}_${menuItem.name}`}
                    value={menuItem.name}
                    primaryText={intl.formatMessage({ id: menuItem.description, defaultMessage: menuItem.description })}
                  />
                ))}
              </SelectField>
            </div>

            <div className={classnames('col-xs-12 col-md-5', classes.searchButtons)}>
              <RaisedButton
                label={<FormattedMessage id="search" />}
                onTouchTap={this.validate}
                icon={<FontIcon className="material-icons">search</FontIcon>}
                className={classes.searchButton}
                primary
              />
              <RaisedButton
                label={<FormattedMessage id="resetButtonText" />}
                onTouchTap={this.resetSearch}
                icon={<FontIcon className="material-icons">settings_backup_restore</FontIcon>}
                disabled={!enableReset}
                className={classes.resetButton}
                primary
              />
            </div>
            {(onSubmitError) ?
              <div>
                <h4 className={classes.errorContainer}>
                  {onSubmitError}
                </h4>
              </div> : null
            }
          </div>
        );
    }
}

Search.propTypes = {
    searchFloatingText: PropTypes.string.isRequired,
    searchHintText: PropTypes.string.isRequired,
    dropDownText: PropTypes.string.isRequired,
    menuStyle: PropTypes.object,
    menuItemStyle: PropTypes.object,
    selectMenuList: PropTypes.array,
    searching: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
};

Search.defaultProps = {
    selectMenuList: [],
    menuStyle: {},
    menuItemStyle: {},
};

export default injectIntl(Search);
