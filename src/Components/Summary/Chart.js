import { ResponsivePie } from '@nivo/pie'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

const Chart = ({ id }) => {

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
				margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
				innerRadius={0.5}
				padAngle={0.7}
				cornerRadius={3}
				activeOuterRadiusOffset={8}
				borderWidth={1}
				borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
				arcLinkLabelsSkipAngle={10}
				arcLinkLabelsTextColor="#333333"
				arcLinkLabelsThickness={2}
				arcLinkLabelsColor={{ from: 'color' }}
				arcLabelsSkipAngle={10}
				arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 4]] }}
				defs={[
					{
						id: 'dots',
						type: 'patternDots',
						background: 'inherit',
						color: 'rgba(255, 255, 255, 0.3)',
						size: 4,
						padding: 1,
						stagger: true
					},
					{
						id: 'lines',
						type: 'patternLines',
						background: 'inherit',
						color: 'rgba(255, 255, 255, 0.3)',
						rotation: -45,
						lineWidth: 6,
						spacing: 10
					}
				]}
				fill={[
					{ match: { id: 'Electricity ⚡' }, id: 'dots' },
					{ match: { id: 'Entertainment 🎮' }, id: 'dots' },
					{ match: { id: 'Fees 🏫' }, id: 'dots' },
					{ match: { id: 'Food 🍔' }, id: 'dots' },
					{ match: { id: 'Gift 🎁' }, id: 'lines' },
					{ match: { id: 'Hotel 🏨' }, id: 'lines' },
					{ match: { id: 'Medical 🏥' }, id: 'lines' },
					{ match: { id: 'Petrol ⛽' }, id: 'lines' },
					{ match: { id: 'Shopping 👗' }, id: 'lines' },
					{ match: { id: 'Transportation 🚇' }, id: 'lines' }
				]}
				legends={[]}
			/>
		</>
	)
}

export default Chart