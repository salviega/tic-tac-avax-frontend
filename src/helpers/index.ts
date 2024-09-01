import { ethers } from 'ethers'

import { ETHEREUM_OBJECT_NOT_FOUND } from '@/config/commons'

export function getRpcUrls(): {
	rpcArbitrumSepolia: string
	rpcAvalancheFuji: string
	rpcBaseSepolia: string
	rpcCeloAlfajores: string
} {
	if (typeof import.meta.env.VITE_RPC_ARBITRUM_SEPOLIA !== 'string') {
		throw new Error('VITE_RPC_ARBITRUM_SEPOLIA is not a string')
	}

	if (typeof import.meta.env.VITE_RPC_AVALANCE_FUJI !== 'string') {
		throw new Error('VITE_RPC_AVALANCE_FUJI is not a string')
	}

	if (typeof import.meta.env.VITE_RPC_BASE_SEPOLIA !== 'string') {
		throw new Error('VITE_RPC_BASE_SEPOLIA is not a string')
	}

	if (typeof import.meta.env.VITE_RPC_CELO_ALFAJORES !== 'string') {
		throw new Error('VITE_RPC_CELO_ALFAJORES is not a string')
	}

	return {
		rpcArbitrumSepolia: import.meta.env.VITE_RPC_ARBITRUM_SEPOLIA,
		rpcAvalancheFuji: import.meta.env.VITE_RPC_AVALANCE_FUJI,
		rpcBaseSepolia: import.meta.env.VITE_RPC_BASE_SEPOLIA,
		rpcCeloAlfajores: import.meta.env.VITE_RPC_CELO_ALFAJORES
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

export function timestampToFormatedDate(timestamp: bigint): string {
	const date = new Date(Number(timestamp) * 1000)

	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	const formattedDate = `${year}/${month}/${day} - ${hours}:${minutes}:${seconds}`

	console.log(formattedDate)
	return formattedDate
}
