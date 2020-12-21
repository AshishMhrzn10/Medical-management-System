import React, { Component } from "react";
import APIHandler from "../utils/APIHandler";

class AutoCompleteMedicine extends Component {
	state = {
		onFocus: false,
		datalist: [],
	};

	constructor(props) {
		super(props);
		this.loadDataMedicine = this.loadDataMedicine.bind(this);
		this.inputData = React.createRef();
	}

	onFocusChange = () => {
		this.setState({ onFocus: true });
	};

	onBlurChange = () => {
		this.setState({ onFocus: false });
	};

	onShowItem = (item) => {
		console.log(item);
		this.inputData.current.value = item.name;
		this.props.showDataInInputs(this.props.itemPosition, item);
		this.onBlurChange();
	};

	async loadDataMedicine(event) {
		var apiHandler = new APIHandler();
		var dataresponse = await apiHandler.fetchMedicineByName(event.target.value);
		this.setState({ datalist: dataresponse.data });
	}

	render() {
		return (
			<React.Fragment>
				<input
					type="text"
					id="medicine_name"
					name="medicine_name"
					className="form-control"
					placeholder="Enter name"
					onFocus={this.onFocusChange}
					autoComplete="off"
					onChange={this.loadDataMedicine}
					ref={this.inputData}
				/>
				{this.state.onFocus === true ? (
					<div>
						<ul
							style={{
								listStyle: "none",
								margin: "0",
								padding: "0",
								border: "1px solid lightgrey",
								boxShadow: "1px 1px 1px lightgrey",
								position: "absolute",
								width: "100%",
								zIndex: "1",
								background: "white",
							}}
						>
							{this.state.datalist.map((item, index) => (
								<li
									key={index}
									style={{
										padding: "5px",
										borderBottom: "1px solid lightgrey",
									}}
									onClick={() => this.onShowItem(item)}
								>
									{item.name}
								</li>
							))}
						</ul>
					</div>
				) : (
					""
				)}
			</React.Fragment>
		);
	}
}

export default AutoCompleteMedicine;
