const createKeccakHash = require('keccak');

function Block(lastBlockHash, version, transactions, merkletreeHash){
    this.lastBlockHash = lastBlockHash;
    this.version = version;
    this.transactions = transactions;
    this.merkletreeHash = merkletreeHash;
}
function Pow(nonce, hash){
    this.nonce = nonce;
    this.hash = hash;
}
var transactions = ["Koti paid 1000 usd to edureka","Koti paid 1000 usd to apple","Koti recieved 1500 usd from TCS"];

var lastBlockHash = createKeccakHash('keccak256').update('lastBlockHash').digest('hex');

var merkletreeHash = createKeccakHash('keccak256').update('merkletreeHash').digest('hex');

var newBlock = new Block(lastBlockHash, '1.0', transactions, merkletreeHash);
var pow = generateHash(newBlock);

console.log(pow);

validatePOW(pow,newBlock);

function generateHash(block){
    var proof = 0;
    var nonce = 0;
    while(!proof){
        var hash = createKeccakHash('keccak256').update(block+''+nonce.toString()).digest('hex');
        console.log(hash);
        if(hash.toString().charAt(0) == 0 && hash.toString().charAt(1) == 0 && hash.toString().charAt(2) == 0 && hash.toString().charAt(3) == 0){
            proof = 1;
            var pow = new Pow(nonce, hash);
        }
        nonce++;
    }
    return pow;
}

function validatePOW(pow, block){
    var hash = createKeccakHash('keccak256').update(block+''+pow.nonce.toString()).digest('hex');
    if(pow.hash == hash){
        console.log("Nonce is validated");
    }
    else{
        console.log("Something Is wrong with the nonce");
    }
}

