export const optionsTypes = {
	SET_MARKDOWN_PREVIEW: 'SET_MARKDOWN_PREVIEW',
};

export const setMarkdownPreview = (status) => ({
	type: optionsTypes.SET_MARKDOWN_PREVIEW,
	payload: status,
});
