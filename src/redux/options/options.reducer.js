import { optionsTypes } from './options.actions';

let INITIAL_STATE = {
	markdownPreview: false,
};

const optionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case optionsTypes.SET_MARKDOWN_PREVIEW:
			return {
				...state,
				markdownPreview: action.payload,
			};
		default:
			return state;
	}
};

export default optionsReducer;
