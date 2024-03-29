import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useParams, useHistory } from 'react-router-dom';
import {
  CardContent, Card, CardMedia, Typography, Button, Grid,
} from '@material-ui/core';

import { getDateFormatted } from '../../../lib';
import { NoFound } from '../components';
import useStyles from './styles';

const TraineeDetail = (props) => {
  const { traineeList } = props;

  const { traineeId } = useParams();
  const classes = useStyles();
  const { path } = useRouteMatch();
  const history = useHistory();

  const trainee = traineeList.filter((element) => element.id === traineeId)[0];

  if (!trainee) {
    return (<NoFound />);
  }

  const {
    image = '/images/defaultThumbnail.png',
    name, email, createdAt,
  } = trainee;

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={image}
          title="Thumbnail"
        />
        <CardContent>
          <div>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="body2">{getDateFormatted(createdAt)}</Typography>
            <Typography variant="body2">{email}</Typography>
          </div>
        </CardContent>
      </Card>
      <Grid container justify="center">
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => { history.push(path.split(':')[0]); }}
        >
          BACK
        </Button>
      </Grid>
    </>
  );
};

TraineeDetail.propTypes = {
  traineeList: PropTypes.arrayOf(PropTypes.object),
};

TraineeDetail.defaultProps = {
  traineeList: [],
};

export default TraineeDetail;
