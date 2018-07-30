const crypto = require('crypto');

var BlockChain = [];
var transactionPool = [];
var previousHash = generateBlockHash('GenesisHash');

var genesisBlock = new Block(0, 0, previousHash);
BlockChain.push(genesisBlock);//Genesis Block

addTransaction('Koti Sends 100 dollars to Varun');
addTransaction('Koti Sends 200 dollars to Manideep');
addTransaction('Koti receives 300 dollars from Rahul');
addTransaction('Koti Sends 400 dollars to Varun');
addTransaction('Koti Sends 500 dollars to Manideep');
addTransaction('Koti receives 700 dollars from Rahul');

var merkletreeHash = createMerkletree(0,5);
var block1 = new Block(previousHash, transactionPool.slice(0,6), merkletreeHash[0]);

BlockChain.push(block1);

addTransaction('Koti Sends 300 dollars to Varun');
addTransaction('Koti Sends 400 dollars to Manideep');
addTransaction('Koti receives 700 dollars from Rahul');
addTransaction('Koti Sends 400 dollars to Varun');
addTransaction('Koti Sends 200 dollars to Manideep');
addTransaction('Koti receives 800 dollars from Rahul');

merkletreeHash = createMerkletree(6,11);
var block2 = new Block(previousHash, transactionPool.slice(6,11), merkletreeHash[0]);


BlockChain.push(block2);

console.log("---------------Starts---------------");
console.log(BlockChain);
console.log("---------------Ends---------------");
/**
This function generates the object with
block hash and its nonce
**/
function HashNonce(hash, nonce){
    this.hash = hash;
    this.nonce = nonce;
}
/**
This function generates Blocks
**/
function Block(lastBlockhash, transactions, merkletree){
    this.lastBlockhash = lastBlockhash;
    this.transactions = transactions;
    this.merkletree = merkletree;
    this.time = new Date().getTime();
    HashNoncevar = generateBlockHash(this.transactions+this.merkletree+this.time);
    this.blockHash = HashNoncevar.hash;
    previousHash = HashNoncevar.hash;
    this.nonce = HashNoncevar.nonce;
}
/**
This function generates merkle tree
returns merkle
**/
function createMerkletree(startIndex, endIndex){
    var isMerkleOver = false;
    var length = endIndex - startIndex +1;
    while(!isMerkleOver){
        var newMerkle = [];
        var copymerkle = transactionPool.slice(startIndex,endIndex+1);
        for(j=0; j<length ; j++){
            if(j+1 > length){
                newMerkle.push(copymerkle[j]);
            }
            else{
                newMerkle.push(generateHash(copymerkle[j]+copymerkle[j++]));
            }
        }
        length = newMerkle.length;
        if(newMerkle.length==1){
            isMerkleOver = true;
        }
        copymerkle = newMerkle;
    }
    return copymerkle;
}
/**
This function adds the transaction into transaction pool.
**/
function addTransaction(transaction){
    transactionPool.push(generateHash(transaction));
}
/**
This function generates SHA256 hash of each transaction.
returns hash
**/
function generateHash(transaction){
    var hash = crypto.createHmac('sha256',transaction).digest('hex');
    return hash;
}
/**
This function generates the block hash with nonce.
Here consensus is to have 0000 as prefix for hash.
**/
function generateBlockHash(transaction){
    var proof = 0;
    var i=0;
    while(!proof){
      var hash = crypto.createHmac('sha256',transaction).update(i.toString()).digest('hex');
      i++;
      if(hash.toString().charAt(0) == 0 && hash.toString().charAt(1) == 0 && hash.toString().charAt(2) == 0 && hash.toString().charAt(3) == 0){
        var hashNonce = new HashNonce(hash,i);
        proof = 1;
      }
    }
    return hashNonce;
}
