export default function Footer() {
	return (
		<footer className="flex flex-col items-center py-5 px-8 z-10 text-sm font-light bg-[#37005B]/50 text-white">
			<p className="text-xs mt-4 sm:mt-0">
				&copy; {new Date().getFullYear()} Tic Tac Toe Avax.	 All rights reserved.
			</p>
		</footer>
	);
}
