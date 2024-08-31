import { createConfig, http } from '@wagmi/core'
import { avalancheFuji } from '@wagmi/core/chains'

export const config = createConfig({
	chains: [avalancheFuji],
	transports: {
		[avalancheFuji.id]: http()
	}
})
