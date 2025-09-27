const queryNewData = (dateCreated: Date) => {
	const createdAt = new Date(dateCreated as Date);
	const now = new Date();
	const diffTime = Math.abs(now.getTime() - createdAt.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays <= 30;
};

export default queryNewData;
