import React, { PropTypes } from 'react';
import c from 'classnames';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import Slider from 'react-slick';
import NextArrow from './nextArrowCarrousel';
import PrevArrow from './prevArrowCarrousel';
import './style.ignoreHash.css';
import classes from './style.scss';

function SlideShow(props) {
    const { openSlides, closeSlideShow, slideshow, title } = props;
    const settings = {
        speed: 500,
        slidesToShow: 1,
        draggable: true,
        slidesToScroll: 1,
        arrows: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
      <div>
        <Dialog
          open={openSlides}
          onRequestClose={closeSlideShow}
          contentClassName={classes.videoContentClass}
          bodyClassName={classes.videoBody}
          autoScrollBodyContent
          repositionOnUpdate
        >
          { title ? (<h1>{title}</h1>) : null}
          <Slider {...settings}>
            {
              slideshow && slideshow.map(item => (
                <section
                  className={c(classes.snapShotOuter, classes[`snapshot_${item.templateId}`])}
                  key={item.slideId}
                >
                  {
                    item.imageUrl ? <img src={item.imageUrl} className={classes.bgImages} alt="" /> : null
                  }
                  {
                    item.templateId !== 5 ?
                      (<img
                        src={require(`../../../public/filterImage${item.templateId}.png`)}
                        className={classes.bgImages}
                        alt=""
                      />) : (<div className={classes.bgOpacity} />)
                  }
                  <div className={c('row', classes.mainContent)}>
                    <div className={c('col-xs-5', classes.leftContent)} />
                    <div className={c('col-xs-7', classes.rightContent)}>
                      <div className={c({ [classes.additionalContent]: item.templateId === 5 })}>
                        <div className={classes.mainTitle}>{item.title}</div>
                        <div className={classes.slideDescription}><pre>{item.description}</pre></div>
                      </div>
                    </div>
                  </div>
                </section>
              ))
            }
          </Slider>
        </Dialog>
      </div>
    );
}

SlideShow.defaultProps = { title: '' };


SlideShow.propTypes = {
    openSlides: PropTypes.bool.isRequired,
    closeSlideShow: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    slideshow: PropTypes.array.isRequired,
};

const mapStateToProps = reduxState => ({
    slideshow: reduxState.publicVideos.slideshow,
});

export default connect(mapStateToProps)(SlideShow);
