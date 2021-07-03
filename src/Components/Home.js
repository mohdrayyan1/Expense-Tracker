import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import Dashboard from './Dashboard/Dashboard';
import RecentTransaction from './RecentTransaction/RecentTransaction';
import Summary from './Summary/Summary';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(3),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
}));

const Home = ({ user, id }) => {

	const classes = useStyles();

	return (
		<>
			<div>
				<div className={classes.root}>
					<Grid container spacing={2} style={{ margin: "0px", marginTop: "5px", width: "100%" }}>
						<Grid item xs={12} sm={6} md={8} lg={8}>
							<Paper className={classes.paper}>
								<Dashboard user={user} />
								<RecentTransaction id={id} />
							</Paper>
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={4}>
							<Paper className={classes.paper}>
								<Summary id={id} />
							</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	)
}

export default Home
