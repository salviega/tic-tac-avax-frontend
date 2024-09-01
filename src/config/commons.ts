import { ethers } from 'ethers'

export const RAINBOW_KIT_APP_NAME: string = 'Tic Tac AVAX'

if (typeof import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID !== 'string') {
	throw new Error('VITE_WALLET_CONNECT_PROJECT_ID is not a string')
}

export const RAINBOW_KIT_APP_ID: string = import.meta.env
	.VITE_WALLET_CONNECT_PROJECT_ID
export const ETHEREUM_OBJECT_NOT_FOUND = 'Ethereum object not found'

export const GAS_LIMIT: bigint = ethers.parseEther('0.000000000001')
