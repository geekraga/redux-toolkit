import React, { PropTypes } from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import classes from './styles.scss';
import { updateSlideDesign } from '../../../actions/propertySnapshots';

function SnapTemplates(props) {
    const { templateList, outerClasses, selectedTempalte, updateSlide } = props;
    return (
      <div className={c(outerClasses, classes.templateContainer)}>
        <h2>
          <FormattedMessage id="chooseLayout" />
        </h2>
        { templateList.map(list => (
          <section
            key={list.thumbnail_url}
            className={
              c({ [classes.selectedTemplate]: (list.id === selectedTempalte.templateId) }, classes.slideTemplate)
            }
            onClick={() => updateSlide(list.id)}
          >
            <i />
            <img src={list.thumbnail_url} alt="" />
          </section>
        )) }
      </div>
    );
}

SnapTemplates.defaultProps = {
    templateList: [],
    outerClasses: '',
};

SnapTemplates.propTypes = {
    templateList: PropTypes.array,
    outerClasses: PropTypes.string,
    selectedTempalte: PropTypes.object.isRequired,
    updateSlide: PropTypes.func.isRequired,
};

const mapStateToProps = reduxState => ({
    templateList: reduxState.propertyInformation.templateList,
    selectedTempalte: reduxState.propertyInformation.selectedTempalte,
});

const mapDispatchToProps = dispatch => ({
    updateSlide: templateId => dispatch(updateSlideDesign({ templateId })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SnapTemplates);
