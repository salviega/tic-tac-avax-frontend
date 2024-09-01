import { ethers } from 'ethers'

import { ETHEREUM_OBJECT_NOT_FOUND } from '@/config/commons'

export function getRpcUrls(): {
	rpcArbitrumSepolia: string
	rpcAvalancheFuji: string
	rpcBaseSepolia: string
	rpcCeloAlfajores: string
} {
	if (typeof import.meta.env.RPC_ARBITRUM_SEPOLIA !== 'string') {
		throw new Error('RPC_ARBITRUM_SEPOLIA is not a string')
	}

	if (typeof import.meta.env.RPC_AVALANCE_FUJI !== 'string') {
		throw new Error('RPC_AVALANCE_FUJI is not a string')
	}

	if (typeof import.meta.env.RPC_BASE_SEPOLIA !== 'string') {
		throw new Error('RPC_BASE_SEPOLIA is not a string')
	}

	if (typeof import.meta.env.RPC_CELO_ALFAJORES !== 'string') {
		throw new Error('RPC_CELO_ALFAJORES is not a string')
	}

	return {
		rpcArbitrumSepolia: import.meta.env.RPC_ARBITRUM_SEPOLIA,
		rpcAvalancheFuji: import.meta.env.RPC_AVALANCE_FUJI,
		rpcBaseSepolia: import.meta.env.RPC_BASE_SEPOLIA,
		rpcCeloAlfajores: import.meta.env.RPC_CELO_ALFAJORES
	}
}

export async function getFrontendSigner(): Promise<ethers.JsonRpcSigner> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const ethereum = (window as any).ethereum

	if (!ethereum) {
		alert(ETHEREUM_OBJECT_NOT_FOUND)
		return Promise.reject(ETHEREUM_OBJECT_NOT_FOUND)
	}

	const web3Provider: ethers.BrowserProvider = new ethers.BrowserProvider(
		ethereum
	)
	await web3Provider.send('eth_requestAccounts', [])
	const web3Signer: ethers.JsonRpcSigner = await web3Provider.getSigner()

	return web3Signer
}
