import React from 'react'
import TypeIt from "typeit-react";

const Error = () => {

	return (
		<>
			<div style={{textAlign:"center"}} className="typeIt">
				<img className="svgStyle" src="/svg/error.svg" alt="" />
				<TypeIt className="errorMessage">Please login to manage your Expense Dashboard.</TypeIt>
			</div>
		</>
	)
}

export default Error
