import { Backdrop, Button, Fade, InputLabel, makeStyles, MenuItem, Modal, Select } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import React, { useState } from 'react'
import { db } from '../../firebase';
import firebase from 'firebase'
import expenses from './expenses.json'
import CurrencyFormat from 'react-currency-format';


const useStyles = makeStyles((theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		border: '0px solid red',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 2),
		fontFamily: "poppins",
		width: "400px",
		"& > .MuiInput-root": {
			width: "100%",
			fontSize: "17px",
			marginBottom: "30px",
		},
		"& > p": {
			fontSize: "20px"
		}
	},
	label: {
		fontSize: "16px",
		marginBottom: "10px",
		fontFamily: "Poppins"
	},
	textfield: {
		width: "100%"
	}
}));


const AmountCard = ({ name, img, amount, id, color }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState('');
	const [income, setIncome] = useState(undefined);
	const [expense, setExpense] = useState(undefined);
	const [cashInHand, setCashInHand] = useState(undefined);


	const handleChange = (event) => {
		setCategory(event.target.value);
	};

	const handleIncome = (e) => {
		e.preventDefault();
		const categoryWithoutEmoji = (category.split(" ")[0]).toLowerCase()
		console.log(categoryWithoutEmoji)
		db.collection("users").doc(id).update({
			income: firebase.firestore.FieldValue.increment(income),
			[`category.${categoryWithoutEmoji}`]: firebase.firestore.FieldValue.increment(income)
		}, { merge: true })
			.then(() => {
				console.log("Document updated succesfully")
			})
			.catch((error) => {
				console.log("Error updating document : ", error.message)
			})
		db.collection("users").doc(id).collection("transactions").add({
			name: "Income",
			category: category,
			amount: income,
			timestamp: firebase.firestore.Timestamp.now()
		})
		setOpen(false)
		setIncome(undefined)
		setCategory('')
	}

	const handleExpense = (e) => {
		e.preventDefault();
		const categoryWithoutEmoji = (category.split(" ")[0]).toLowerCase()
		console.log(categoryWithoutEmoji)
		db.collection("users").doc(id).update({
			expense: firebase.firestore.FieldValue.increment(expense),
			[`category.${categoryWithoutEmoji}`]: firebase.firestore.FieldValue.increment(expense)
		})
			.then(() => {
				console.log("Document updated succesfully")
			})
			.catch((error) => {
				console.log("Error updating document : ", error.message)
			})
		db.collection("users").doc(id).collection("transactions").add({
			name: "Expense",
			category: category,
			amount: expense,
			timestamp: firebase.firestore.Timestamp.now()
		})
		setOpen(false)
		setExpense(undefined)
		setCategory('')
	}

	const handleCash = (e) => {
		e.preventDefault();
		db.collection("users").doc(id).update({
			cashInHand: firebase.firestore.FieldValue.increment(cashInHand)
		})
			.then(() => {
				console.log("Document updated succesfully")
			})
			.catch((error) => {
				console.log("Error updating document : ", error.message)
			})
		setOpen(false)
		setCashInHand(undefined)
		setCategory('')
	}

	return (
		<>
			<div>
				<Modal
					aria-labelledby="transition-modal-title"
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={open}
					onClose={() => setOpen(false)}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
					}}
				>
					<Fade in={open}>
						<div className={classes.paper}>
							<p>Details</p>
							{name === "Income" && (
								<>
									<InputLabel id={name} className={classes.label}>{name} Source</InputLabel>
									<Select
										labelId={name}
										id="demo-simple-select"
										value={category}
										onChange={handleChange}
										className={classes.select}
									>
										<MenuItem value="" default>Choose</MenuItem>
										<MenuItem value="Salary 🤑">Salary 🤑</MenuItem>
										<MenuItem value="Others 💰">Others 💰</MenuItem>
									</Select>
									<InputLabel className={classes.label} htmlFor="standard-adornment-amount">Amount</InputLabel>
									<CurrencyFormat customInput={Input} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'}
										value={income} onValueChange={(values) => {
											const { formattedValue, value } = values;
											setIncome(Number(value))
										}}
									/>
									<Button variant="contained" color="primary" onClick={handleIncome}>Submit</Button>
								</>
							)}
							{name === "Expense" && (
								<>
									<InputLabel id={name} className={classes.label}>{name}</InputLabel>
									<Select
										labelId={name}
										id="demo-simple-select"
										value={category}
										onChange={handleChange}
										className={classes.select}
									>
										<MenuItem value="" default>Choose</MenuItem>
										{expenses.map((element, index) => (
											<MenuItem key={index} value={element.categoryName}>{element.categoryName}</MenuItem>
										))}
									</Select>
									<InputLabel className={classes.label} htmlFor="standard-adornment-amount">Amount</InputLabel>
									<CurrencyFormat customInput={Input} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'}
										value={expense} onValueChange={(values) => {
											const { formattedValue, value } = values;
											setExpense(Number(value))
										}}
									/>
									<Button variant="contained" color="primary" onClick={handleExpense}>Submit</Button>
								</>
							)}
							{name === "Cash in hand" && (
								<>
									<InputLabel className={classes.label} htmlFor="standard-adornment-amount">Amount</InputLabel>
									<CurrencyFormat customInput={Input} thousandSeparator={true} thousandSpacing={'2s'} prefix={'₹'}
										value={cashInHand} onValueChange={(values) => {
											const { formattedValue, value } = values;
											setCashInHand(Number(value))
										}}
									/>
									<Button variant="contained" color="primary" onClick={handleCash}>Submit</Button>
								</>
							)}
						</div>
					</Fade>
				</Modal>
				<div className="amount__card">
					<p className="amount__name">{name}</p>
					<div className="amount__plus" onClick={() => setOpen(true)}>
						<img src="/svg/plus.svg" alt="" />
					</div>
					<div className="amount__icon">
						<img src={img} alt="" />
					</div>
					<div className={`amount__rupees ${color}`}>
						<CurrencyFormat value={amount} displayType={'text'} thousandSeparator={true} thousandSpacing={'2s'}
							renderText={value => <div>₹ {value}</div>}
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default AmountCard
