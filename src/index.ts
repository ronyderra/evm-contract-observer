import express from "express";
import config from "./config";
import { fork } from "child_process";
import { WorkerData, ContractStruct } from "./types";

const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();

const contracts:ContractStruct = {

      "0xb8403ffba4d0af0e430b128c5569e335ec00c4c9": {
        name: 'CMC Staking', symbol: 'CMCS',
      },

      "0x0c5ab026d74c451376a4798342a685a0e99a5bee": {
        name: "MachineFi NFT",
        symbol: "MFI",
      },

      "0xce300b00aa9c066786d609fc96529dbedaa30b76": {
        name: 'IoTeX PUNKS', symbol: 'PUNK', 
      },

      "0xbe6514fc4a702793e46fe3516fc70d160d13a463": {
        name: 'Iotexsons special', symbol: 'TIOSS',
      },


      "0x55cbc794f7577e3d6b787c014a607c39373632eb": {
        name: 'Iotexsons avatar', symbol: 'TIOS',
      },

      "0x30582ede7fadeba4973dd71f1ce157b7203171ea": {
        name: 'Ucam Pioneer', symbol: 'UPT', 
      },

      "0x9756e951dd76e933e34434db4ed38964951e588b": {
        name: 'SUMOTEX', symbol: 'SUMOTEX', 
      },

      "0x8d1fdef8e955eb81267af67cdec9b7f2c688faa5": {
        name: 'Burn-Drop Ignite', symbol: 'BDI', 
      },

      "0x6d4d3e3499df0e9f2e4b02cec088928ff78ad986": {
        name: 'I voted', symbol: 'IVOTED', 
      },

      "0x9f60e573197d1eef369b155efa5f048d8d510942": {
        name: 'Blade Weapon', symbol: 'NBLW', 
      },

      "0x3cca8164adbf428dfeb292c2d1ec9803f67c9edb": {
        name: 'Blade Character', symbol: 'NBLC', 
      },

      "0xe6df6f666be3d9d4060d14de4c4e778e1addb912": {
        name: 'Pebble Pioneer', symbol: 'PPT', 
      },
};

app.listen(config.port || 3100, async () => {



  runWorker({
    contracts,
    timeout: 0.5,
    interval: 5,
    chainId: "20"
  });


});

function runWorker(data: WorkerData) {
  let worker = fork("lib/worker", [JSON.stringify(data)]);
  worker.addListener("exit", (code) => {
    runWorker({
      ...data,
      timeout: 0,
    });
  });
}
