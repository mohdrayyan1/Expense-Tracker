import { IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, useTheme } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import './RecentTransaction.css'
import { db } from '../../firebase';

const useStyles1 = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

function TablePaginationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleFirstPageButtonClick = (event) => {
		onChangePage(event, 0);
	};

	const handleBackButtonClick = (event) => {
		onChangePage(event, page - 1);
	};

	const handleNextButtonClick = (event) => {
		onChangePage(event, page + 1);
	};

	const handleLastPageButtonClick = (event) => {
		onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
	};

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleFirstPageButtonClick}
				disabled={page === 0}
				aria-label="first page"
			>
				{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton
				onClick={handleLastPageButtonClick}
				disabled={page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="last page"
			>
				{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</div>
	);
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
	table: {
		minWidth: 500,
		"& .MuiTableBody-root .MuiTableRow-root .MuiTableCell-body": {
			fontFamily: "Poppins"
		},
		height: "400px"
	},
	tableHead: {
		backgroundColor: "black",
		"& .MuiTableRow-root .MuiTableCell-root": {
			color: "white",
			fontFamily: "Poppins"
		},
	},
	cell: {
		padding: "1px 16px",
		height: "50px",
		fontSize: "1rem"
	},
});

const RecentTransaction = ({ id }) => {
	const classes = useStyles2();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [rows, setRows] = useState([])
	

	useEffect(() => {
		if (id) {
			db
				.collection("users")
				.doc(id)
				.collection("transactions")
				.orderBy("timestamp", "desc")
				.onSnapshot(snapshot => {
					setRows(snapshot.docs.map((doc) => doc.data()))
				})
		}
	}, [id])

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<div className="recenttransaction">
			{rows && (
				<>
					<p>Recent Transactions</p>
					<TableContainer component={Paper} style={{ margin: "5px 0px" }}>
						<Table className={classes.table} aria-label="custom pagination table">
							<TableHead className={classes.tableHead}>
								<TableRow>
									<TableCell>#</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Date</TableCell>
									<TableCell>Amount</TableCell>
									<TableCell>Type</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									: rows
								).map((row, index) => (
									<TableRow key={index}>
										<TableCell className={classes.cell} style={{ width: 10 }}>{index + 1}</TableCell>
										<TableCell className={classes.cell} style={{ width: 300 }}>{row.category}</TableCell>
										<TableCell className={classes.cell} style={{ width: "30px" }}>
											{row.timestamp.toDate().toLocaleDateString()}
										</TableCell>
										<TableCell className={classes.cell} style={{ width: 70 }}>
											<CurrencyFormat value={row.amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'}
												renderText={value => <div>₹ {value}</div>} />
										</TableCell>
										<TableCell className={classes.cell} style={{ width: 70 }}>
											{(row.name === "Income") ? (
												<span className="green" style={{background:"#d4ffd9"}}>{row.name}</span>
											) : (
												<span className="red" style={{background:"#ffbdbd"}}>{row.name}</span>
											)}
										</TableCell>
									</TableRow>
								))}

								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={5} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5]}
										colSpan={5}
										count={rows.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										ActionsComponent={TablePaginationActions}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</>
			)}
		</div>
	);
}

export default RecentTransaction