const logoutUser = () => {
	localStorage.removeItem('token');
	document.location.reload();
};

export { logoutUser };
