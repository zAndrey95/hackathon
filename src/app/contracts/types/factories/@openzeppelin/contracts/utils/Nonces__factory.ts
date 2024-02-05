/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  Nonces,
  NoncesInterface,
} from "../../../../@openzeppelin/contracts/utils/Nonces";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "currentNonce",
        type: "uint256",
      },
    ],
    name: "InvalidAccountNonce",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class Nonces__factory {
  static readonly abi = _abi;
  static createInterface(): NoncesInterface {
    return new utils.Interface(_abi) as NoncesInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Nonces {
    return new Contract(address, _abi, signerOrProvider) as Nonces;
  }
}
