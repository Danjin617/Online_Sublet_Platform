	const dbuser = process.env.DBUSER;
	const dbpassword = process.env.DBPASSWORD;

module.exports = {

  // url : 'mongodb://localhost:27017/test'
  // url: `mongodb+srv://${dbuser}:${dbpassword}@cluster0-wyevb.mongodb.net/test?retryWrites=true&w=majority`
url: 'mongodb://heroku_nmsxm014:30cnbh0mflbgcrdakbdolnu6@ds149905.mlab.com:49905/heroku_nmsxm014'

}
