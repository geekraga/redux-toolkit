import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PageBase from '../../components/PageBase';
import HostVideos from './hostVideos';
import PropertySnapshots from '../../components/PropertySnapshots';
import SlideDialog from '../../components/PropertySnapshots/SlideDialog';
import { clearPropertyHostVideos, fetchPropertyHostSlides } from '../../actions/propertyInformation';
import {
    getSlideTemplates,
    fetchPropertySlides,
    deletePropertySlides,
} from '../../actions/async/propertyManagement';

class PropertyInformation extends Component {
    constructor(props) {
        super(props);
        const propertyId = parseInt(props.match.params.pid, 10);
        const { propertyList } = props;
        let currentProperty = {};
        if (propertyList.length && propertyId) {
            currentProperty = propertyList.find(x => x.id === propertyId);
        }
        this.state = {
            currentProperty,
            currentBreadCrumId: 'addPropertyInfoTip',
            currentTitle: 'addPropertyInfoTip',
            showHostVideos: true,
            hostVideoTypeId: 1,
            showLoader: true,
            showDialog: false,
            slideDialogHeader: 'createVideo',
            slideDialogText: 'canNotCreateVideo',
            buttonText: 'gotItText',
            showRightButton: false,
            isSlide: false,
        };
    }

    componentDidMount() {
        const { history, isFormPageValid, fetchTemplates, templateList } = this.props;
        if (!isFormPageValid) {
            history.push('/');
        } else if (!templateList.length) {
            fetchTemplates();
        }
    }

    componentWillUnmount() {
        this.props.clearPropertyInformation();
    }

    addSlideInfo = (currentTitle, hostVideoTypeId, loadSlides) => {
        if (loadSlides) {
            this.toggleLoader(true);
            this.props.getPropertySlides(this.state.currentProperty.id, hostVideoTypeId).then(() => {
                this.setState({
                    showLoader: false,
                    currentBreadCrumId: 'addPropertySlide',
                    currentTitle,
                    showHostVideos: false,
                    hostVideoTypeId,
                });
            });
        } else {
            this.props.createPropertySlides();
            this.setState({
                currentBreadCrumId: 'addPropertySlide',
                currentTitle,
                showHostVideos: false,
                hostVideoTypeId });
        }
    };

    toggleLoader = showLoader => {
        this.setState({ showLoader });
    };

    exitSlideInfo = () => {
        this.setState({
            currentBreadCrumId: 'addPropertyInfoTip',
            currentTitle: 'addPropertyInfoTip',
            showHostVideos: true });
    };

    showSlideDeleteInfo = () => {
        this.setState({
            showDialog: true,
            slideDialogHeader: 'createVideo',
            slideDialogText: 'canNotCreateVideo',
            buttonText: 'gotItText',
            showRightButton: false,
        });
    };
    showVideoDeleteInfo = () => {
        this.setState({
            showDialog: true,
            slideDialogHeader: 'createSlide',
            slideDialogText: 'canNotCreateSlide',
            buttonText: 'gotItText',
            showRightButton: false,
        });
    };

    shouldDeleteSlides = hostVideoTypeId => {
        this.setState({
            showDialog: true,
            hostVideoTypeId,
            slideDialogHeader: 'delSlide',
            slideDialogText: 'doNotDeleteSlide',
            buttonText: 'cancel',
            showRightButton: true,
            isSlide: true,
        });
    };
    shouldDeleteVideos = hostVideoTypeId => {
        this.setState({
            showDialog: true,
            hostVideoTypeId,
            slideDialogHeader: 'delVideo',
            slideDialogText: 'doNotDeleteVideo',
            buttonText: 'cancel',
            showRightButton: true,
            isSlide: false,
        });
    };

    confirmDeleteSlides = () => {
        const { currentProperty, hostVideoTypeId } = this.state;
        const { removePropertySlides } = this.props;
        this.setState({ showDialog: false, showLoader: true });
        removePropertySlides(currentProperty.id, hostVideoTypeId).then(() => {
            this.toggleLoader(false);
        });
    };

    closeDialog = () => {
        this.setState({ showDialog: false });
    };

    render() {
        const {
            currentBreadCrumId: id,
            currentProperty,
            currentTitle,
            showHostVideos,
            hostVideoTypeId,
            showLoader,
            showDialog,
            slideDialogHeader,
            slideDialogText,
            buttonText,
            showRightButton,
        } = this.state;
        const { id: propertyId, propertyName } = currentProperty;
        const { intl } = this.props;
        return (
          <PageBase
            title={<FormattedMessage id={currentTitle} defaultMessage={currentTitle} />}
            navigation={
              <FormattedMessage
                id="breadCrumbs.addPropertyInfo"
                values={{ propertyName, header: intl.formatMessage({ id }) }}
              />
            }
            minHeight={300}
          >
            {
              showHostVideos ? (
                <HostVideos
                  propertyId={propertyId}
                  addSnapshot={this.addSlideInfo}
                  toggleLoader={this.toggleLoader}
                  showSlideDeleteInfo={this.showSlideDeleteInfo}
                  showVideoDeleteInfo={this.showVideoDeleteInfo}
                  deleteSlides={this.shouldDeleteSlides}
                  deleteVideos={this.shouldDeleteVideos}
                  showLoader={showLoader}
                />
              ) : (
                <PropertySnapshots
                  exitSlideInfo={this.exitSlideInfo}
                  hostVideoTypeId={hostVideoTypeId}
                  propertyId={currentProperty.id}
                />
              )
            }
            <SlideDialog
              showSlideDialog={showDialog}
              headerText={slideDialogHeader}
              slideDialogText={slideDialogText}
              buttonText={buttonText}
              showRightButton={showRightButton}
              handleCloseDialog={this.closeDialog}
              rightButtonCallBack={this.confirmDeleteSlides}
              rightButtonText={this.state.isSlide ? 'delSlide' : 'delVideo'}
            />
          </PageBase>
        );
    }
}

PropertyInformation.propTypes = {
    propertyList: PropTypes.array.isRequired,
    isFormPageValid: PropTypes.bool.isRequired,
    intl: intlShape.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.object.isRequired,
    fetchTemplates: PropTypes.func.isRequired,
    clearPropertyInformation: PropTypes.func.isRequired,
    getPropertySlides: PropTypes.func.isRequired,
    createPropertySlides: PropTypes.func.isRequired,
    templateList: PropTypes.array.isRequired,
    removePropertySlides: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    propertyList: reduxState.propertyInformation.propertyList,
    isFormPageValid: reduxState.runtimeSettings.isFormPageValid,
    templateList: reduxState.propertyInformation.templateList,
});

const mapDispatchToProps = dispatch => ({
    fetchTemplates: () => dispatch(getSlideTemplates()),
    clearPropertyInformation: () => dispatch(clearPropertyHostVideos()),
    getPropertySlides: (id, contentId) => dispatch(fetchPropertySlides(id, contentId)),
    createPropertySlides: (id, contentId) => dispatch(fetchPropertyHostSlides(id, contentId)),
    removePropertySlides: (id, contentId) => dispatch(deletePropertySlides(id, contentId)),
});

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(PropertyInformation));
