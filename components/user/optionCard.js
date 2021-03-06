// react imports
import React, { Component } from 'react';
// supporting imports
import PropTypes from 'prop-types';
import Router from 'next/router';
// material-ui imports
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({ // eslint-disable-line no-unused-vars
  root: {
    margin: '0 auto',
    padding: 10,
  },
  card: {
    width: 300,
  },
  cardContent: {
    minHeight: 75,
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  media: {
    height: 120,
  },
});

class OptionCard extends Component {
  handleClick = () => {
    Router.push(this.props.link);
  }
  render() {
    const {
      classes,
      title,
      body,
      button,
      image,
    } = this.props;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={image}
            title={title}
          />
          <CardContent className={classes.cardContent}>
            <Typography type="headline" component="h2">
              {title}
            </Typography>
            <Typography component="p">
              {body}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button dense color="primary" onClick={this.handleClick}>
              {button}
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

OptionCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  button: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default withStyles(styles)(OptionCard);
