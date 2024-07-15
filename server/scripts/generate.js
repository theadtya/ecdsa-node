const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");


const privateKey = secp.secp256k1.utils.randomPrivateKey();
const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log("private key: ", toHex(privateKey))
console.log("public key: ", toHex(publicKey))


//=================================list==========================================


//100
// private key:  a9dddb83e4b17d93668cde56179a31e78b525a8cd0ef69a7d2a2de7d1a0271aa
// public key:  02e2b047287ea704210af526698b2122497347818bea7db6a5852d20c55a462faf


// 50
// private key:  250b6f22cc49786f365d25f881c47a1392a89c86074c0478a00129fa336eb27d
// public key:  02feb01de62f18508e4cb00d7c4efd7207744e13cae7eef9305655f1d7070926ad


//75
// private key:  e918d4c1aca34894baa3c1a68e93e751a44457940dbcc7869a7ea91933c9ccb5
// public key:  02c9b0fb601c18b350b6a2521cb932446ba59d765ef6f30af481cde173cc8e33cf