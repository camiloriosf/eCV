// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import StarIcon from 'material-ui-icons/Star';
import StarBorderIcon from 'material-ui-icons/StarBorder';
import BackspaceIcon from 'material-ui-icons/Backspace';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    minWidth: 150,
  },
  optional: {
    fontWeight: theme.typography.body1.fontWeight,
    lineHeight: theme.typography.body1.lineHeight,
    fontStyle: 'italic',
  },
  button: {
    width: 30,
    height: 30,
  },
});

class Rating extends Component {
  state = {
    stars: this.props.stars,
  }
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.stars !== nextProps.stars) {
      this.setState({ stars: nextProps.stars });
      return true;
    }
    if (this.state.stars !== nextState.stars) return true;
    return false;
  }
  handleMouseEnter = stars => () => {
    this.setState({ stars });
  }
  handleMouseLeave = () => {
    this.setState({ stars: this.props.stars });
  }
  handleClick = value => () => {
    this.props.handleChange({ name: 'stars', value, index: this.props.index });
  }
  render() {
    const {
      classes,
      t,
    } = this.props;
    return (
      <div className={classes.root}>
        <Typography type="body2" color="secondary">
          {t('create.sections.skills.fields.rating.title')} <span className={classes.optional}>{t('create.sections.skills.fields.rating.span')}</span>
        </Typography>
        <Tooltip id="user" title={t('create.sections.skills.fields.rating.user')} placement="bottom">
          <IconButton
            aria-label="User"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(1)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(1)}
          >
            {
              this.state.stars > 0
                ? <StarIcon />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip id="advancedUser" title={t('create.sections.skills.fields.rating.advancedUser')} placement="bottom">
          <IconButton
            aria-label="Advanced User"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(2)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(2)}
          >
            {
              this.state.stars > 1
                ? <StarIcon />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip id="medium" title={t('create.sections.skills.fields.rating.medium')} placement="bottom">
          <IconButton
            aria-label="Medium"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(3)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(3)}
          >
            {
              this.state.stars > 2
                ? <StarIcon />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip id="professional" title={t('create.sections.skills.fields.rating.professional')} placement="bottom">
          <IconButton
            aria-label="Professional"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(4)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(4)}
          >
            {
              this.state.stars > 3
                ? <StarIcon />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip id="expert" title={t('create.sections.skills.fields.rating.expert')} placement="bottom">
          <IconButton
            aria-label="Expert"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(5)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(5)}
          >
            {
              this.state.stars > 4
                ? <StarIcon />
                : <StarBorderIcon />
            }
          </IconButton>
        </Tooltip>
        <Tooltip id="clear" title={t('create.sections.skills.fields.rating.clear')} placement="bottom">
          <IconButton
            aria-label="Clear"
            className={classes.button}
            onMouseEnter={this.handleMouseEnter(0)}
            onMouseLeave={this.handleMouseLeave}
            onClick={this.handleClick(0)}
          >
            <BackspaceIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

Rating.propTypes = {
  classes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default translate('cv')(withStyles(styles)(Rating));
