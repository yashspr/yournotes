import React, { Component } from 'react';
import debounce from 'debounce';

class Textarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			initialValue: props.value,
			debouncedHandler: debounce((onChange, updatedNote) => {
				onChange(updatedNote);
			}, 1000),
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.value !== state.initialValue) {
			return {
				...state,
				initialValue: props.value,
				value: props.value,
			};
		} else {
			return state;
		}
	}

	handleEvent = (e) => {
		this.setState({ value: e.target.value });
		this.state.debouncedHandler(this.props.onChange, e.target.value);
	};

	render() {
		const { placeholder } = this.props;

		return (
			<textarea
				className="textarea"
				placeholder={placeholder}
				onChange={this.handleEvent}
				value={this.state.value}
			></textarea>
		);
	}
}

export default Textarea;
