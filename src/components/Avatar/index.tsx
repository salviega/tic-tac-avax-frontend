import Blockies from 'react-blockies';

interface AvatarProps {
    address: string;
}

export default function Avatar({ address }: AvatarProps) {
    return (
        <div className="flex items-center space-x-4 p-2 bg-[#37005B]/50 rounded-xl shadow-lg">
            <Blockies
                seed={address.toLowerCase()}
                size={10}
                scale={4}
                className="rounded-full"
            />
            <div>
                <p className="text-white text-lg font-semibold">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
                <a className="text-gray-400 text-sm" target='_blank' href={`https://subnets-test.avax.network/c-chain/address/${address}`}>
                    Ir
                </a>
            </div>
        </div>

    )
}    