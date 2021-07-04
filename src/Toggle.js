import React, { useEffect, useState } from 'react';
import { setTheme } from './themes';

function Toggle() {
	const [togClass, setTogClass] = useState('dark');
	let theme = localStorage.getItem('theme');

	const handleOnClick = () => {
		if (localStorage.getItem('theme') === 'theme-dark') {
			setTheme('theme-light');
			setTogClass('light')
		} else {
			setTheme('theme-dark');
			setTogClass('dark')
		}
	}

	useEffect(() => {
		if (localStorage.getItem('theme') === 'theme-dark') {
			setTogClass('dark')
		} else if (localStorage.getItem('theme') === 'theme-light') {
			setTogClass('light')
		}
	}, [theme])

	return (
		<>
			{
				togClass === "dark" ?
					<input type="checkbox" id="toggle" class="toggle--checkbox" onClick={handleOnClick} checked />
					:
					<input type="checkbox" id="toggle" class="toggle--checkbox" onClick={handleOnClick} />
			}
			{/* <input type="checkbox" id="toggle" class="toggle--checkbox" /> */}
			<label for="toggle" class="toggle--label">
			</label>
			<div class="background"></div>
			{/* <div className="container--toggle">
				{
					togClass === "light" ?
						<input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} checked />
						:
						<input type="checkbox" id="toggle" className="toggle--checkbox" onClick={handleOnClick} />
				}
			</div> */}
		</>
	)
}

export default Toggle