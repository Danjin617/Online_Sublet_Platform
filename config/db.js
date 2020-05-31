	const dbuser = process.env.DBUSER;
	const dbpassword = process.env.DBPASSWORD;

module.exports = {

  // url : 'mongodb://localhost:27017/test'
   url: `mongodb+srv://${dbuser}:${dbpassword}@cluster0-wyevb.mongodb.net/test?retryWrites=true&w=majority`
}
