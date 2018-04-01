const fs = require('fs');
const crypto = require('crypto');

let transactions;
fs.readFile('./test_files/1_Transaction.txt',(err,data)=>{
	var fileName = '1_Transaction';
	if(err){
		throw err;
	}
	else{
		transactions = data.toString();
		if(fileName.charAt(0)==1){
			fs.readFile('./test_files/0_Transactions.txt',(_err,_data)=>{
				if(err) throw err;
				var previousHash = crypto.createHmac('sha256',_data.toString()).digest('hex');
				generateHash(transactions,previousHash);
			})
		}
		
	}
});

function generateHash(_transactions,previousHash){
	var hash;
	var proof;
	for (var i = 1; !proof; i++) {
		hash = crypto.createHmac('sha256',_transactions).update(i.toString()).digest('hex');
		console.log(hash);
		if(hash.toString().charAt(0)==hash.toString().charAt(1)){
			proof = i;
			console.log("Proof code is :"+i);
		}
	}
}
