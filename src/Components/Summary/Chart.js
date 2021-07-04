import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react'
import gradient from './Gradient.json'
import { db } from '../../firebase'

const Chart = ({ id }) => {

	const [salary, setSalary] = useState(0)
	const [electricity, setElectricity] = useState(0)
	const [entertainment, setEntertainment] = useState(0)
	const [fees, setFees] = useState(0)
	const [food, setFood] = useState(0)
	const [gift, setGift] = useState(0)
	const [hotel, setHotel] = useState(0)
	const [medical, setMedical] = useState(0)
	const [petrol, setPetrol] = useState(0)
	const [shopping, setShopping] = useState(0)
	const [transportation, setTransportation] = useState(0)


	useEffect(() => {
		console.log(id)
		if (id) {
			db
				.collection("users")
				.doc(id)
				.onSnapshot(doc => {
					if (doc.data().category) {
						setSalary(doc.data().category.salary)
						setElectricity(doc.data().category.electricity)
						setEntertainment(doc.data().category.entertainment)
						setFees(doc.data().category.fees)
						setFood(doc.data().category.food)
						setGift(doc.data().category.gift)
						setHotel(doc.data().category.hotel)
						setMedical(doc.data().category.medical)
						setPetrol(doc.data().category.petrol)
						setShopping(doc.data().category.shopping)
						setTransportation(doc.data().category.transportation)
					} else {
						console.log("absent")
					}

				})
		}
	}, [id])



	return (
		<>
			<ResponsivePie
				data={[
					{
						"id": "Salary 🤑",
						"label": "Salary 🤑",
						"value": salary,
					},
					{
						"id": "Electricity ⚡",
						"label": "Electricity ⚡",
						"value": electricity,
					},
					{
						"id": "Entertainment 🎮",
						"label": "Entertainment 🎮",
						"value": entertainment,
					},
					{
						"id": "Fees 🏫",
						"label": "Fees 🏫",
						"value": fees,
					},
					{
						"id": "Food 🍔",
						"label": "Food 🍔",
						"value": food,
					},
					{
						"id": "Gift 🎁",
						"label": "Gift 🎁",
						"value": gift,
					},
					{
						"id": "Hotel 🏨",
						"label": "Hotel 🏨",
						"value": hotel
					},
					{
						"id": "Medical 🏥",
						"label": "Medical 🏥",
						"value": medical
					},
					{
						"id": "Petrol ⛽",
						"label": "Petrol ⛽",
						"value": petrol
					},
					{
						"id": "Shopping 👗",
						"label": "Shopping 👗",
						"value": shopping
					},
					{
						"id": "Transportation 🚇",
						"label": "Transportation 🚇",
						"value": transportation
					}
				]}
				margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
				theme={
					{
						"background": "#ffffff",
						"textColor": "#333333",
						"fontSize": 15
					}
				}
				defs={gradient}
				fill={[
					{ match: { id: 'Electricity ⚡' }, id: 'gradientA' },
					{ match: { id: 'Entertainment 🎮' }, id: 'gradientB' },
					{ match: { id: 'Fees 🏫' }, id: 'gradientC' },
					{ match: { id: 'Food 🍔' }, id: 'gradientD' },
					{ match: { id: 'Gift 🎁' }, id: 'gradientE' },
					{ match: { id: 'Hotel 🏨' }, id: 'gradientF' },
					{ match: { id: 'Medical 🏥' }, id: 'gradientG' },
					{ match: { id: 'Petrol ⛽' }, id: 'gradientH' },
					{ match: { id: 'Shopping 👗' }, id: 'gradientI' },
					{ match: { id: 'Transportation 🚇' }, id: 'gradientJ' },
					{ match: { id: 'Salary 🤑' }, id: 'gradientK' }
				]}
			/>
		</>
	)
}

export default Chart