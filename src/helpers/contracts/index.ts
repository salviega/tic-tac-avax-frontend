/* eslint-disable camelcase */
import { ethers } from 'ethers'

import {
	TicTacAvax,
	TicTacAvax__factory,
	TicTacAvaxCross,
	TicTacAvaxCross__factory
} from '@/@types/typechain-types'
import arbitrumSepoliaTicTacAvaxJson from '@/assets/json/blockchain/arbitrumSepolia/TicTacAvax.json'
import arbitrumSepoliaTicTacAvaxCrossJson from '@/assets/json/blockchain/arbitrumSepolia/TicTacAvaxCross.json'
import avalancheFujiTicTacAvaxJson from '@/assets/json/blockchain/avalancheFuji/TicTacAvax.json'
import avalancheFujiTicTacAvaxCrossJson from '@/assets/json/blockchain/avalancheFuji/TicTacAvaxCross.json'
import baseSepoliaTicTacAvaxJson from '@/assets/json/blockchain/baseSepolia/TicTacAvax.json'
import baseSepoliaTicTacAvaxCrossJson from '@/assets/json/blockchain/baseSepolia/TicTacAvaxCross.json'
import celoAlfajoresTicTacAvaxJson from '@/assets/json/blockchain/celoAlfajores/TicTacAvax.json'
import celoAlfajoresTicTacAvaxCrossJson from '@/assets/json/blockchain/celoAlfajores/TicTacAvaxCross.json'
import { chains } from '@/enums/chains.enum'
import { Contracts } from '@/models/contracts.model'

import { getRpcUrls } from '..'

export function getContracts(chain: chains): Contracts {
	let selectedAddressTicTacAvax: string = ''
	let selectedAddressTicTacAvaxCross: string = ''
	let provider: ethers.JsonRpcProvider
	const webSocket = new ethers.WebSocketProvider(
		'wss://avalanche-fuji-c-chain-rpc.publicnode.com'
	)

	const rpcUrls = getRpcUrls()

	if (chain === 'arbitrumSepolia') {
		provider = new ethers.JsonRpcProvider(rpcUrls.rpcArbitrumSepolia)
		selectedAddressTicTacAvax = arbitrumSepoliaTicTacAvaxJson.address
		selectedAddressTicTacAvaxCross = arbitrumSepoliaTicTacAvaxCrossJson.address
	} else if (chain === 'avalancheFuji') {
		provider = new ethers.JsonRpcProvider(rpcUrls.rpcAvalancheFuji)
		selectedAddressTicTacAvax = avalancheFujiTicTacAvaxJson.address
		selectedAddressTicTacAvaxCross = avalancheFujiTicTacAvaxCrossJson.address
	} else if (chain === 'baseSepolia') {
		provider = new ethers.JsonRpcProvider(rpcUrls.rpcBaseSepolia)
		selectedAddressTicTacAvax = baseSepoliaTicTacAvaxJson.address
		selectedAddressTicTacAvaxCross = baseSepoliaTicTacAvaxCrossJson.address
	} else if (chain === 'celoAlfajores') {
		provider = new ethers.JsonRpcProvider(rpcUrls.rpcCeloAlfajores)
		selectedAddressTicTacAvax = celoAlfajoresTicTacAvaxJson.address
		selectedAddressTicTacAvaxCross = celoAlfajoresTicTacAvaxCrossJson.address
	} else {
		throw new Error(`Unsupported chain: ${chain}`)
	}

	const ticTacAvax: TicTacAvax = TicTacAvax__factory.connect(
		selectedAddressTicTacAvax,
		provider
	)

	const ticTacAvaxWebSocket: TicTacAvax = TicTacAvax__factory.connect(
		selectedAddressTicTacAvax,
		webSocket
	)

	const ticTacAvaxCross: TicTacAvaxCross = TicTacAvaxCross__factory.connect(
		selectedAddressTicTacAvaxCross,
		provider
	)

	const ticTacAvaxCrossWebSocket: TicTacAvaxCross =
		TicTacAvaxCross__factory.connect(selectedAddressTicTacAvaxCross, webSocket)

	ticTacAvaxWebSocket.on('MoveMade', (player, row, col) => {
		console.log(
			`Movimiento realizado por ${player} en la posición [${row}, ${col}]`
		)
		// Aquí puedes actualizar el estado del frontend
	})

	ticTacAvaxWebSocket.on('GameWon', winner => {
		console.log(`Juego ganado por ${winner}`)
		// Actualiza el estado del frontend
	})

	ticTacAvaxWebSocket.on('GameDraw', () => {
		console.log('Juego empatado')
		// Actualiza el estado del frontend
	})

	ticTacAvaxWebSocket.on('GameReset', () => {
		console.log('Juego reiniciado')
		// Actualiza el estado del frontend
	})

	return {
		ticTacAvax,
		ticTacAvaxWebSocket,
		ticTacAvaxCross,
		ticTacAvaxCrossWebSocket
	}
}
