/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "AxelarExecutable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AxelarExecutable__factory>;
    getContractFactory(
      name: "IAxelarExecutable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAxelarExecutable__factory>;
    getContractFactory(
      name: "IAxelarGasService",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAxelarGasService__factory>;
    getContractFactory(
      name: "IAxelarGateway",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IAxelarGateway__factory>;
    getContractFactory(
      name: "IContractIdentifier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IContractIdentifier__factory>;
    getContractFactory(
      name: "IGovernable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IGovernable__factory>;
    getContractFactory(
      name: "IImplementation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IImplementation__factory>;
    getContractFactory(
      name: "IInterchainGasEstimation",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IInterchainGasEstimation__factory>;
    getContractFactory(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IOwnable__factory>;
    getContractFactory(
      name: "IUpgradable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IUpgradable__factory>;
    getContractFactory(
      name: "TicTacAvax",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TicTacAvax__factory>;
    getContractFactory(
      name: "TicTacAvaxCross",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TicTacAvaxCross__factory>;

    getContractAt(
      name: "AxelarExecutable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.AxelarExecutable>;
    getContractAt(
      name: "IAxelarExecutable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAxelarExecutable>;
    getContractAt(
      name: "IAxelarGasService",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAxelarGasService>;
    getContractAt(
      name: "IAxelarGateway",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IAxelarGateway>;
    getContractAt(
      name: "IContractIdentifier",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IContractIdentifier>;
    getContractAt(
      name: "IGovernable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IGovernable>;
    getContractAt(
      name: "IImplementation",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IImplementation>;
    getContractAt(
      name: "IInterchainGasEstimation",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IInterchainGasEstimation>;
    getContractAt(
      name: "IOwnable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IOwnable>;
    getContractAt(
      name: "IUpgradable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IUpgradable>;
    getContractAt(
      name: "TicTacAvax",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TicTacAvax>;
    getContractAt(
      name: "TicTacAvaxCross",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.TicTacAvaxCross>;

    deployContract(
      name: "AxelarExecutable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AxelarExecutable>;
    deployContract(
      name: "IAxelarExecutable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarExecutable>;
    deployContract(
      name: "IAxelarGasService",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarGasService>;
    deployContract(
      name: "IAxelarGateway",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarGateway>;
    deployContract(
      name: "IContractIdentifier",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IContractIdentifier>;
    deployContract(
      name: "IGovernable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IGovernable>;
    deployContract(
      name: "IImplementation",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IImplementation>;
    deployContract(
      name: "IInterchainGasEstimation",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IInterchainGasEstimation>;
    deployContract(
      name: "IOwnable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "IUpgradable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUpgradable>;
    deployContract(
      name: "TicTacAvax",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TicTacAvax>;
    deployContract(
      name: "TicTacAvaxCross",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TicTacAvaxCross>;

    deployContract(
      name: "AxelarExecutable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.AxelarExecutable>;
    deployContract(
      name: "IAxelarExecutable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarExecutable>;
    deployContract(
      name: "IAxelarGasService",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarGasService>;
    deployContract(
      name: "IAxelarGateway",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IAxelarGateway>;
    deployContract(
      name: "IContractIdentifier",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IContractIdentifier>;
    deployContract(
      name: "IGovernable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IGovernable>;
    deployContract(
      name: "IImplementation",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IImplementation>;
    deployContract(
      name: "IInterchainGasEstimation",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IInterchainGasEstimation>;
    deployContract(
      name: "IOwnable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IOwnable>;
    deployContract(
      name: "IUpgradable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IUpgradable>;
    deployContract(
      name: "TicTacAvax",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TicTacAvax>;
    deployContract(
      name: "TicTacAvaxCross",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.TicTacAvaxCross>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
