import React from 'react'
import './Summary.css'
import Chart from './Chart'

const Summary = ({ id }) => {
	return (
		<>
			<div className="summary">
				<p>Summary</p>
				<div className="chart">
					<Chart id={id} />
				</div>
			</div>
		</>
	)
}

export default Summary
