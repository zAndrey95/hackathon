/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  CAHCard,
  CAHCardInterface,
} from "../../../contracts/Card.sol/CAHCard";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_minters",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AlreadySet",
    type: "error",
  },
  {
    inputs: [],
    name: "CardNotExists",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyMinter",
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
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [],
    name: "WrongArrayLength",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "CardUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "minter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAllowed",
        type: "bool",
      },
    ],
    name: "SetMinter",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "addMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "data",
        type: "string[]",
      },
    ],
    name: "bulkMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "data",
        type: "string[]",
      },
    ],
    name: "bulkUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "minter",
        type: "address",
      },
    ],
    name: "removeMinter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "data",
        type: "string",
      },
    ],
    name: "update",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200122e3803806200122e8339810160408190526200003491620002b3565b816001600160a01b0381166200006457604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6200006f8162000170565b5060016200007e85826200045b565b5060026200008d84826200045b565b50805160005b81811015620001425760006001600160a01b0316838281518110620000bc57620000bc62000527565b60200260200101516001600160a01b031603620000ec5760405163d92e233d60e01b815260040160405180910390fd5b60016005600085848151811062000107576200010762000527565b6020908102919091018101516001600160a01b03168252810191909152604001600020805460ff191691151591909117905560010162000093565b5050506001600160a01b03166000908152600560205260409020805460ff19166001179055506200053d9050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b0381118282101715620002015762000201620001c0565b604052919050565b600082601f8301126200021b57600080fd5b81516001600160401b03811115620002375762000237620001c0565b60206200024d601f8301601f19168201620001d6565b82815285828487010111156200026257600080fd5b60005b838110156200028257858101830151828201840152820162000265565b506000928101909101919091529392505050565b80516001600160a01b0381168114620002ae57600080fd5b919050565b60008060008060808587031215620002ca57600080fd5b84516001600160401b0380821115620002e257600080fd5b620002f08883890162000209565b95506020915081870151818111156200030857600080fd5b6200031689828a0162000209565b955050620003276040880162000296565b93506060870151818111156200033c57600080fd5b8701601f810189136200034e57600080fd5b805182811115620003635762000363620001c0565b8060051b925062000376848401620001d6565b818152928201840192848101908b8511156200039157600080fd5b928501925b84841015620003ba57620003aa8462000296565b8252928501929085019062000396565b989b979a50959850505050505050565b600181811c90821680620003df57607f821691505b6020821081036200040057634e487b7160e01b600052602260045260246000fd5b50919050565b601f82111562000456576000816000526020600020601f850160051c81016020861015620004315750805b601f850160051c820191505b8181101562000452578281556001016200043d565b5050505b505050565b81516001600160401b03811115620004775762000477620001c0565b6200048f81620004888454620003ca565b8462000406565b602080601f831160018114620004c75760008415620004ae5750858301515b600019600386901b1c1916600185901b17855562000452565b600085815260208120601f198616915b82811015620004f857888601518255948401946001909101908401620004d7565b5085821015620005175787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b634e487b7160e01b600052603260045260246000fd5b610ce1806200054d6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80638da5cb5b1161008c578063c87b56dd11610066578063c87b56dd1461017d578063d85d3d2714610190578063f2fde38b146101a3578063f745630f146101b657600080fd5b80638da5cb5b1461014757806395d89b4114610162578063983b2d561461016a57600080fd5b806306fdde03146100d457806318160ddd146100f25780633092afd514610104578063715018a6146101195780637e3cdcb21461012157806381b6571d14610134575b600080fd5b6100dc6101c9565b6040516100e991906107b8565b60405180910390f35b6003545b6040519081526020016100e9565b610117610112366004610807565b610257565b005b6101176102f6565b61011761012f3660046109a2565b61030a565b6101176101423660046109df565b6103c1565b6000546040516001600160a01b0390911681526020016100e9565b6100dc61043b565b610117610178366004610807565b610448565b6100dc61018b366004610a98565b61050c565b6100f661019e366004610ab1565b6105ae565b6101176101b1366004610807565b610648565b6101176101c4366004610ae6565b61068b565b600180546101d690610b23565b80601f016020809104026020016040519081016040528092919081815260200182805461020290610b23565b801561024f5780601f106102245761010080835404028352916020019161024f565b820191906000526020600020905b81548152906001019060200180831161023257829003601f168201915b505050505081565b61025f6106c9565b6001600160a01b03811660009081526005602052604090205460ff166102985760405163a741a04560e01b815260040160405180910390fd5b6001600160a01b0381166000818152600560209081526040808320805460ff191690558051938452908301919091527f1f96bc657d385fd83da973a43f2ad969e6d96b6779b779571a7306db7ca1cd0091015b60405180910390a150565b6102fe6106c9565b61030860006106f6565b565b6103126106c9565b600354815160005b818110156103bb5783818151811061033457610334610b5d565b602002602001015160046000858061034b90610b73565b9650815260200190815260200160002090816103679190610beb565b506003805490600061037883610b73565b90915550506040518381526001909101907ff0fccd560fca917e13abb71d2ad3233824ce5cde6807557c5510e42c98732baa9060200160405180910390a161031a565b50505050565b6103c96106c9565b8051825181146103ec5760405163150072e360e11b815260040160405180910390fd5b60005b818110156103bb5761043384828151811061040c5761040c610b5d565b602002602001015184838151811061042657610426610b5d565b6020026020010151610746565b6001016103ef565b600280546101d690610b23565b6104506106c9565b6001600160a01b0381166104775760405163d92e233d60e01b815260040160405180910390fd5b6001600160a01b03811660009081526005602052604090205460ff16156104b15760405163a741a04560e01b815260040160405180910390fd5b6001600160a01b038116600081815260056020908152604091829020805460ff191660019081179091558251938452908301527f1f96bc657d385fd83da973a43f2ad969e6d96b6779b779571a7306db7ca1cd0091016102eb565b600081815260046020526040902080546060919061052990610b23565b80601f016020809104026020016040519081016040528092919081815260200182805461055590610b23565b80156105a25780601f10610577576101008083540402835291602001916105a2565b820191906000526020600020905b81548152906001019060200180831161058557829003601f168201915b50505050509050919050565b3360009081526005602052604081205460ff166105de57604051639cdc2ed560e01b815260040160405180910390fd5b60038054600091826105ef83610b73565b90915550600081815260046020526040902090915061060e8482610beb565b506040518181527ff0fccd560fca917e13abb71d2ad3233824ce5cde6807557c5510e42c98732baa9060200160405180910390a192915050565b6106506106c9565b6001600160a01b03811661067f57604051631e4fbdf760e01b8152600060048201526024015b60405180910390fd5b610688816106f6565b50565b3360009081526005602052604090205460ff166106bb57604051639cdc2ed560e01b815260040160405180910390fd5b6106c58282610746565b5050565b6000546001600160a01b031633146103085760405163118cdaa760e01b8152336004820152602401610676565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600354821061076857604051630e2e0c1d60e41b815260040160405180910390fd5b60008281526004602052604090206107808282610beb565b506040518281527ff0fccd560fca917e13abb71d2ad3233824ce5cde6807557c5510e42c98732baa9060200160405180910390a15050565b60006020808352835180602085015260005b818110156107e6578581018301518582016040015282016107ca565b506000604082860101526040601f19601f8301168501019250505092915050565b60006020828403121561081957600080fd5b81356001600160a01b038116811461083057600080fd5b9392505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561087657610876610837565b604052919050565b600067ffffffffffffffff82111561089857610898610837565b5060051b60200190565b600082601f8301126108b357600080fd5b813567ffffffffffffffff8111156108cd576108cd610837565b6108e0601f8201601f191660200161084d565b8181528460208386010111156108f557600080fd5b816020850160208301376000918101602001919091529392505050565b600082601f83011261092357600080fd5b813560206109386109338361087e565b61084d565b82815260059290921b8401810191818101908684111561095757600080fd5b8286015b8481101561099757803567ffffffffffffffff81111561097b5760008081fd5b6109898986838b01016108a2565b84525091830191830161095b565b509695505050505050565b6000602082840312156109b457600080fd5b813567ffffffffffffffff8111156109cb57600080fd5b6109d784828501610912565b949350505050565b600080604083850312156109f257600080fd5b823567ffffffffffffffff80821115610a0a57600080fd5b818501915085601f830112610a1e57600080fd5b81356020610a2e6109338361087e565b82815260059290921b84018101918181019089841115610a4d57600080fd5b948201945b83861015610a6b57853582529482019490820190610a52565b96505086013592505080821115610a8157600080fd5b50610a8e85828601610912565b9150509250929050565b600060208284031215610aaa57600080fd5b5035919050565b600060208284031215610ac357600080fd5b813567ffffffffffffffff811115610ada57600080fd5b6109d7848285016108a2565b60008060408385031215610af957600080fd5b82359150602083013567ffffffffffffffff811115610b1757600080fd5b610a8e858286016108a2565b600181811c90821680610b3757607f821691505b602082108103610b5757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b600060018201610b9357634e487b7160e01b600052601160045260246000fd5b5060010190565b601f821115610be6576000816000526020600020601f850160051c81016020861015610bc35750805b601f850160051c820191505b81811015610be257828155600101610bcf565b5050505b505050565b815167ffffffffffffffff811115610c0557610c05610837565b610c1981610c138454610b23565b84610b9a565b602080601f831160018114610c4e5760008415610c365750858301515b600019600386901b1c1916600185901b178555610be2565b600085815260208120601f198616915b82811015610c7d57888601518255948401946001909101908401610c5e565b5085821015610c9b5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220cf7fa129a1a19832a8824b6e92f0d1a4e03265b06f656799d533a7ce23c320ac64736f6c63430008170033";

type CAHCardConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CAHCardConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CAHCard__factory extends ContractFactory {
  constructor(...args: CAHCardConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    _minters: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<CAHCard> {
    return super.deploy(
      name_,
      symbol_,
      _owner,
      _minters,
      overrides || {}
    ) as Promise<CAHCard>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    _minters: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      _owner,
      _minters,
      overrides || {}
    );
  }
  override attach(address: string): CAHCard {
    return super.attach(address) as CAHCard;
  }
  override connect(signer: Signer): CAHCard__factory {
    return super.connect(signer) as CAHCard__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CAHCardInterface {
    return new utils.Interface(_abi) as CAHCardInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CAHCard {
    return new Contract(address, _abi, signerOrProvider) as CAHCard;
  }
}