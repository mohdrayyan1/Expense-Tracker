import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase';
import AmountCard from './AmountCard';
import './Dashboard.css'


const Dashboard = ({ user }) => {

	const [id, setId] = useState()
	const [income, setIncome] = useState(0)
	const [expense, setExpense] = useState(0)
	const [cash, setCash] = useState(0)



	useEffect(() => {
		if (user) {
			db.collection("users").where("email", "==", user.email)
				.onSnapshot((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						setId(doc.id)
						setIncome(doc.data().income)
						setExpense(doc.data().expense)
						setCash(doc.data().cashInHand)
					});
				});
		}
	}, [user])

	return (
		<>
			<div className="dashboard">
				<p>Dashboard</p>
				<Grid container spacing={2} style={{ margin: "10px 0px 30px 0px", width: "100%", justifyContent: "space-between" }}>
					{/* <Grid item xs={12} sm={12} md={6} lg={4}> */}
					<AmountCard
						name="Income"
						img="/images/profits.png"
						amount={income}
						id={id}
						color="green"
					/>
					{/* </Grid>
					<Grid item xs={12} sm={12} md={6} lg={4}> */}
					<AmountCard
						name="Expense"
						img="/images/expenses.png"
						amount={expense}
						id={id}
						color="red"
					/>
					{/* </Grid>
					<Grid item xs={12} sm={12} md={6} lg={4}> */}
					<AmountCard
						name="Cash in hand"
						img="/images/cash-payment.png"
						amount={cash}
						id={id}
						color="blue"
					/>
					{/* </Grid> */}
				</Grid>
			</div>
		</>
	)
}

export default Dashboard
