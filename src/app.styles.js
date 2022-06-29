import styled from "styled-components";
export const Container = styled.div`
	font-family: 'Roboto', sans-serif;
	display: flex;
	background-color: #191919;
	height: 100vh;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	
	.row-input {
		display: flex;
		margin: 0 0 0.5rem 0;
		align-items: center;
	}

	.amount-input {
		display: flex;
		margin: 0 1rem 0 0;
		align-items: center;
		background-color: #292f3a;
		border-radius: 10px;
		border: 1px solid #565a61;
		padding: 0.5rem;

		span {
			color: #565a61;
			border-left: none;
		}
	}

	.con-meta {
		color: #aeaeae;
		font-size: 0.87rem;
		margin: 1rem 0 0 0;
	}
`

export const Dropdown = styled.select`
	border: none;
	padding: 0.65rem 0.5rem;	
	background-color: #292f3a;
	border-radius: 10px;
	box-shadow: 0.1px 0.1px 1px #454950;
	color: #fff;
	outline: none;
	text-align: left;
	min-width: 65px;
	border: 1px solid #565a61;

	&:focus{
		box-shadow: 0px 0px 3px #1f5eff;
		border: 1px solid #1f5eff;
	}
`

export const DropdownOption = styled.option`
	margin: 1rem 0 0 0;
	padding: 0.5rem;
`


export const AmountInput = styled.input`
	color: #fff;
	outline: none;
	background-color: #292f3a;
	border: none;
`
