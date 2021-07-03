import React from 'react'
import TypeIt from "typeit-react";

const Error = () => {

	const svgStyle = {
		width: "800px",
		height: "600px",
		objectFit: "contain",
		textAlign: "center",
		display: "block",
		margin: "0 auto",
	}

	const errorMessage = {
		position: "relative",
		top:"-40px",
		fontFamily: 'Poppins',
		fontSize: "35px",
		margin: "0 auto",
	}

	return (
		<>
			<div style={{textAlign:"center"}}>
				<img style={svgStyle} src="/svg/error.svg" alt="" />
				<TypeIt style={errorMessage}>Please login to manage your Expense Dashboard.</TypeIt>
			</div>
		</>
	)
}

export default Error
