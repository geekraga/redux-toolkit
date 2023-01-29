import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import FontIcon from 'material-ui/FontIcon';
import ReactTooltip from 'react-tooltip';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ButtonContainer from '../ButtonContainer';
import ContentRow from './contentRow';
import classes from './styles.scss';
import styles from './styles';
import {
    addLocalizedInfoContent,
    reomveLocalizedInfoContent,
    handleInputChange,
    inputLanguageChange,
    enableValidationCheck,
    radionInputChange,
    setIsValidState,
} from '../../../actions/runTimeSettings';

class ContentDetails extends Component {
    constructor() {
        super();
        this.state = ({
            maxLocalInfoExceedError: false,
        });
        this.addContent = this.addContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);
        this.validateData = this.validateData.bind(this);
        this.languageChange = this.languageChange.bind(this);
        this.radioInputChange = this.radioInputChange.bind(this);
    }

    componentWillMount() {
        const { languages, localInfo } = this.props;
        if (localInfo.length === languages.length) {
            this.setState({ maxLocalInfoExceedError: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isValidState, loadNext } = this.props;
        if (nextProps.isValid) {
            loadNext();
            isValidState();
        }
    }

    componentDidUpdate() {
        ReactTooltip.rebuild();
    }

    addContent() {
        const { addNewContent, languages, localInfo } = this.props;
        const content = {
            name: '',
            languageId: {
                value: '',
                isValid: false,
                selectedError: '',
            },
            description: '',
            defaultLocallanguageId: false,
            checkValidations: false,
            isDataValid: false,
        };
        if (localInfo.length === languages.length - 1) {
            this.setState({ maxLocalInfoExceedError: true });
            ReactTooltip.hide();
        }
        addNewContent(content);
    }

    deleteContent(index) {
        ReactTooltip.hide();
        const { localInfo, removeContent } = this.props;
        if (localInfo.length > 1) {
            this.setState({ maxLocalInfoExceedError: false });
            removeContent(index);
        }
    }

    handleInputChange(index, e) {
        const name = e.target.name;
        const value = e.target.value;
        this.props.handleChange(index, name, value);
    }

    languageChange(e, index, value, keyIndex) {
        this.props.handleLanguageChange(keyIndex, value);
    }

    validateData() {
        this.props.validationsCheck();
    }

    radioInputChange(selectedIndex) {
        this.props.radioChange(selectedIndex);
    }

    render() {
        const { languages, localInfo, intl } = this.props;
        const { maxLocalInfoExceedError } = this.state;
        const btnToolTip = intl.formatMessage({ id: 'addLocalised' });
        return (
          <div className={classes.mainContainer}>
            {
              !maxLocalInfoExceedError ?
                (
                  <FloatingActionButton
                    style={styles.floatingActionButton}
                    iconStyle={styles.iconStyle}
                    onClick={this.addContent}
                    data-tip={btnToolTip}
                    data-class={classes.tooltipStyle}
                    data-place="bottom"
                    data-effect="solid"
                    className={classes.floatingActionButton}
                    secondary
                  >
                    <FontIcon className="material-icons">add</FontIcon>
                  </FloatingActionButton>
                ) : null
            }
            <h3 className={classes.heading}>
              <FormattedMessage id="contentDetails" />
            </h3>
            {localInfo.map((row, i) => (
              <ContentRow
                key={i}
                keyIndex={i}
                row={row}
                deleteRow={index => this.deleteContent(index)}
                languages={languages}
                handleInputChange={(index, e) => this.handleInputChange(index, e)}
                languageChange={this.languageChange}
                localInfo={localInfo}
                isDisabled={localInfo.length === 1}
                radioInputChange={this.radioInputChange}
              />
            ))}
            <ButtonContainer
              showPrevious={false}
              nextBtnHandler={this.validateData}
            />
          </div>
        );
    }
}

ContentDetails.defaultProps = {
    localInfo: [],
    languages: [],
};

ContentDetails.propTypes = {
    localInfo: PropTypes.array,
    languages: PropTypes.array,
    addNewContent: PropTypes.func.isRequired,
    removeContent: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleLanguageChange: PropTypes.func.isRequired,
    validationsCheck: PropTypes.func.isRequired,
    radioChange: PropTypes.func.isRequired,
    isValidState: PropTypes.func.isRequired,
    loadNext: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
};

const mapStateToProps = reduxState => ({
    languages: reduxState.languages,
    localInfo: reduxState.runtimeSettings.localInfoData,
    isValid: reduxState.runtimeSettings.isValid,
});

const mapDispatchToProps = dispatch => ({
    handleChange(index, name, value) {
        dispatch(handleInputChange(index, name, value));
    },
    handleLanguageChange(keyIndex, value) {
        dispatch(inputLanguageChange(keyIndex, value));
    },
    addNewContent(newRow) {
        dispatch(addLocalizedInfoContent(newRow));
    },
    removeContent(index) {
        dispatch(reomveLocalizedInfoContent(index));
    },
    validationsCheck() {
        dispatch(enableValidationCheck());
    },
    isValidState() {
        dispatch(setIsValidState());
    },
    radioChange(selectedIndex) {
        dispatch(radionInputChange(selectedIndex));
    },
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ContentDetails));
