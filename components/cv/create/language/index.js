// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
// component imports
import SectionHeader from '../sectionHeader';
import TipCard from '../tipCard';
import ExamplesSteppter from '../examplesStepper';
import Item from './item';
import AddNew from './addNew';
// local imports
import {
  doSectionDBUpdate,
  doUpdateSectionDataArray,
  doReorderSectionItems,
  doAddNewLanguage,
  doDeleteSectionItem,
  doChangeSectionTitle,
} from '../../../../lib/redux/actions/cv';
import { makeGetSectionDataState } from '../../../../lib/reselect/cv';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {

  },
  content: {
    marginTop: theme.spacing.unit * 3,
  },
  tipTitle: {
    marginTop: theme.spacing.unit * 3,
  },
  tipSubtitle: {
    marginTop: theme.spacing.unit,
  },
});

const getItemStyle = (draggableStyle, isDragging) => ({
  background: isDragging ? 'rgba(0, 0, 0, 0.12)' : 'inherit',
  ...draggableStyle,
});

class Index extends Component {
  componentDidMount = () => {
    this.delayedSaving = _.debounce(this.props.doSectionDBUpdate, 2000);
  }
  onDragEnd = (result) => {
    this.props.doReorderSectionItems(result);
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onInputChange = ({ name, index }) => (event) => {
    this.props.doUpdateSectionDataArray({
      name, value: event.target.value, index,
    });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onLanguageAdd = ({ index }) => () => {
    this.props.doAddNewLanguage({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onLanguageDelete = ({ index }) => () => {
    this.props.doDeleteSectionItem({ index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onStarChange = ({ name, value, index }) => {
    this.props.doUpdateSectionDataArray({ name, value, index });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  onSectionTitleEdit = ({ id }) => (event) => {
    this.props.doChangeSectionTitle({ id, value: event.target.value });
    this.delayedSaving({ selected: this.props.cv.id });
  }
  render() {
    const {
      classes,
      t,
      cv,
    } = this.props;
    return (
      <div className={classes.root}>
        <SectionHeader
          title={cv.text !== '' ? cv.text : t('create.sections.language.title')}
          subtitle={t('create.sections.language.subtitle')}
          id={cv.id}
          editable
          handleTitleEdit={this.onSectionTitleEdit}
        >
          <div className={classes.content}>
            <Divider />
            <Grid container >
              <Grid item xs={12}>
                <Typography type="button" className={classes.tipTitle}>
                  {t('create.sections.language.tips.title')}
                </Typography>
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.language.tips.text1')}
                </Typography>
                <TipCard text={t('create.sections.language.tips.tip1')} />
                <Typography type="body2" color="secondary" className={classes.tipSubtitle}>
                  {t('create.sections.language.tips.text2')}
                </Typography>
                <TipCard text={t('create.sections.language.tips.tip2')} />
                <TipCard text={t('create.sections.language.tips.tip3')} wrong />
              </Grid>
              <Grid item xs={12}>
                <ExamplesSteppter
                  items={[
                    <Typography type="body2">{t('create.sections.language.examples.0')}</Typography>,
                    <Typography type="body2">{t('create.sections.language.examples.1')}</Typography>,
                    <Typography type="body2">{t('create.sections.language.examples.2')}</Typography>,
                  ]}
                />
              </Grid>
            </Grid>
          </div>
        </SectionHeader>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div
                ref={provided.innerRef}
              >
                {_.sortBy(cv.data, ['index']).map(item => (
                  <Draggable key={item.index} draggableId={item.index}>
                    {(providedDraggable, snapshotDraggable) => (
                      <div>
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(
                                      providedDraggable.draggableStyle,
                                      snapshotDraggable.isDragging,
                                    )}
                        >
                          <Item
                            index={item.index}
                            language={item.language}
                            description={item.description}
                            stars={item.stars}
                            dragprops={providedDraggable.dragHandleProps}
                            handleChange={this.onInputChange}
                            handleLanguageAdd={this.onLanguageAdd}
                            handleLanguageDelete={this.onLanguageDelete}
                            handleStarChange={this.onStarChange}
                          />
                        </div>
                        {providedDraggable.placeholder}
                      </div>
                              )}
                  </Draggable>
                          ))}
                {provided.placeholder}
              </div>
                  )}
          </Droppable>
        </DragDropContext>
        <AddNew
          index={cv.data.length}
          handleLanguageAdd={this.onLanguageAdd}
        />
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const makeMapStateToProps = () => {
  const getDataState = makeGetSectionDataState();
  return (state, props) => getDataState(state, props);
};

const mapDispatchToProps = dispatch => ({
  doSectionDBUpdate: bindActionCreators(doSectionDBUpdate, dispatch),
  doReorderSectionItems: bindActionCreators(doReorderSectionItems, dispatch),
  doUpdateSectionDataArray: bindActionCreators(doUpdateSectionDataArray, dispatch),
  doAddNewLanguage: bindActionCreators(doAddNewLanguage, dispatch),
  doDeleteSectionItem: bindActionCreators(doDeleteSectionItem, dispatch),
  doChangeSectionTitle: bindActionCreators(doChangeSectionTitle, dispatch),
});

export default connect(
  makeMapStateToProps,
  mapDispatchToProps,
)(translate('cv')(withStyles(styles)(Index)));
