import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { TextField, RaisedButton, FontIcon } from 'material-ui';
import c from 'classnames';
import trim from 'lodash/trim';
import classes from '../../containers/MetaTagManagement/styles.scss';

class VideoSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            enableReset: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    handleChange(e) {
        this.setState({ search: e.target.value });
    }

    submitSearch() {
        this.props.videoResult(this.state.search);
        this.setState({ enableReset: true });
    }

    resetSearch() {
        this.setState({ search: '', enableReset: false });
        this.props.videoResult(null);
    }

    render() {
        const { enableReset, search } = this.state;
        return (
          <div className={c('row', classes.main)}>
            <div className="col-xs-12 col-md-7">
              <TextField
                name="search"
                onChange={this.handleChange}
                value={search}
                floatingLabelText={<FormattedMessage id="searchAutoComplete" />}
                hintText={<FormattedMessage id="searchAutoComplete" />}
                autoComplete="off"
                fullWidth
              />
            </div>
            <div className={c('col-xs-12 col-md-5', classes.searchButtons)}>
              <RaisedButton
                label={<FormattedMessage id="search" />}
                onTouchTap={this.submitSearch}
                icon={<FontIcon className="material-icons">search</FontIcon>}
                className={classes.searchButton}
                disabled={!trim(search)}
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
          </div>
        );
    }
}

VideoSearch.propTypes = {
    videoResult: PropTypes.func.isRequired,
};

export default VideoSearch;
