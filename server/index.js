const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');


app.use(cors());
app.use(express.json());

const balances = {
  "02e2b047287ea704210af526698b2122497347818bea7db6a5852d20c55a462faf": 100,
  "02feb01de62f18508e4cb00d7c4efd7207744e13cae7eef9305655f1d7070926ad": 50,
  "02c9b0fb601c18b350b6a2521cb932446ba59d765ef6f30af481cde173cc8e33cf": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, sig: sigStringed, msg } = req.body;

  const { recipient, amount } = msg;

  const sig = {
    ...sigStringed,
    r: BigInt(sigStringed.r),
    s: BigInt(sigStringed.s)
  }

  const hashMessage = msg => keccak256(Uint8Array.from(msg))


  const isValid = secp.secp256k1.verify(sig, hashMessage(msg), sender) === true;

  if (!isValid) res.status(400).send({ message: "Signature not valid !!!" })

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
