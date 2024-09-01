/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../../../../common";

export interface IGovernableInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "governance"
      | "mintLimiter"
      | "transferGovernance"
      | "transferMintLimiter"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "GovernanceTransferred" | "MintLimiterTransferred"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "governance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mintLimiter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferGovernance",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferMintLimiter",
    values: [AddressLike]
  ): string;

  decodeFunctionResult(functionFragment: "governance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintLimiter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferGovernance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferMintLimiter",
    data: BytesLike
  ): Result;
}

export namespace GovernanceTransferredEvent {
  export type InputTuple = [
    previousGovernance: AddressLike,
    newGovernance: AddressLike
  ];
  export type OutputTuple = [previousGovernance: string, newGovernance: string];
  export interface OutputObject {
    previousGovernance: string;
    newGovernance: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace MintLimiterTransferredEvent {
  export type InputTuple = [
    previousGovernance: AddressLike,
    newGovernance: AddressLike
  ];
  export type OutputTuple = [previousGovernance: string, newGovernance: string];
  export interface OutputObject {
    previousGovernance: string;
    newGovernance: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IGovernable extends BaseContract {
  connect(runner?: ContractRunner | null): IGovernable;
  waitForDeployment(): Promise<this>;

  interface: IGovernableInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  governance: TypedContractMethod<[], [string], "view">;

  mintLimiter: TypedContractMethod<[], [string], "view">;

  transferGovernance: TypedContractMethod<
    [newGovernance: AddressLike],
    [void],
    "nonpayable"
  >;

  transferMintLimiter: TypedContractMethod<
    [newGovernance: AddressLike],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "governance"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "mintLimiter"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "transferGovernance"
  ): TypedContractMethod<[newGovernance: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferMintLimiter"
  ): TypedContractMethod<[newGovernance: AddressLike], [void], "nonpayable">;

  getEvent(
    key: "GovernanceTransferred"
  ): TypedContractEvent<
    GovernanceTransferredEvent.InputTuple,
    GovernanceTransferredEvent.OutputTuple,
    GovernanceTransferredEvent.OutputObject
  >;
  getEvent(
    key: "MintLimiterTransferred"
  ): TypedContractEvent<
    MintLimiterTransferredEvent.InputTuple,
    MintLimiterTransferredEvent.OutputTuple,
    MintLimiterTransferredEvent.OutputObject
  >;

  filters: {
    "GovernanceTransferred(address,address)": TypedContractEvent<
      GovernanceTransferredEvent.InputTuple,
      GovernanceTransferredEvent.OutputTuple,
      GovernanceTransferredEvent.OutputObject
    >;
    GovernanceTransferred: TypedContractEvent<
      GovernanceTransferredEvent.InputTuple,
      GovernanceTransferredEvent.OutputTuple,
      GovernanceTransferredEvent.OutputObject
    >;

    "MintLimiterTransferred(address,address)": TypedContractEvent<
      MintLimiterTransferredEvent.InputTuple,
      MintLimiterTransferredEvent.OutputTuple,
      MintLimiterTransferredEvent.OutputObject
    >;
    MintLimiterTransferred: TypedContractEvent<
      MintLimiterTransferredEvent.InputTuple,
      MintLimiterTransferredEvent.OutputTuple,
      MintLimiterTransferredEvent.OutputObject
    >;
  };
}
