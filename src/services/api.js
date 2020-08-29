import axios from 'axios';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
	baseURL: 'http://localhost:4000',
});

export default {
	isUserLoggedIn() {
		return apiClient.get('/auth/isuserloggedin');
	},
	signout() {
		return apiClient.get('/auth/logout');
	},
	fetchMetadata() {
		return apiClient.get('/drive/metadata');
	},
	fetchNotes(fileIds) {
		return apiClient.post('/drive/view', fileIds);
	},
	fetchNote(fileID) {
		return apiClient.get(`/drive/view/${fileID}`);
	},
	uploadNotes(note) {
		return apiClient.post('/drive/upload', note);
	},
	deleteNotes(fileIDs) {
		return apiClient.post('/drive/delete', fileIDs);
	},
	updateNotes(updateNotes) {
		return apiClient.post('/drive/update', updateNotes);
	},
};
