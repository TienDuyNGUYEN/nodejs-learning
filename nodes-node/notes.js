console.log('Starting notes.js');
module.exports.age = 20; //Exporting the static number

module.exports.addNote = () => {
	console.log('addNote');
	return 'New note';
};

module.exports.add = (a,b) => {
	return a+b;
}