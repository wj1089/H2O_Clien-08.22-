import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { DoctorProfile, DoctorDetails} from '../DoctorAccount';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const DoctorAccount = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          <DoctorProfile />
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          <DoctorDetails />
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorAccount;
