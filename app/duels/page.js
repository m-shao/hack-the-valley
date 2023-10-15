export default function Duel() {
	return (
		<div className='flex'>
			{/* User side */}
			<div className='w-1/2 h-screen bg-gray-500'>
				<div className='w-full my-auto'>
					<div className='w-full h-8 bg-gray-300 border border-gray-500 rounded'>
						<div
							className='h-8 bg-green-500'
							style={{ width: '90%' }}>
							Health: 90%
						</div>
					</div>
				</div>
				<div
					contentEditable='true'
					className='flex items-center text-white'>
					const firstnumber = 5; <br />
					let totalSum = 0; <br />
					for(let i = 0; i &lt; firstnumber; i++) <br />
					&nbsp;&nbsp;&nbsp;totalSum = totalSum+1; <br />
					console.log(The TOTALSUM of number is: " " + totalSum);
				</div>
				<div className='flex bottom-0 h-16 w-full'>
					<textarea
						className='w-full h-40 bg-gray-500 border placeholder-gray-200 text-sm'
						placeholder='Why did you change the things you did?'>
						{/* Cdoe input */}
					</textarea>
				</div>
			</div>

			{/*  Opp side */}
			<div className='w-1/2 h-screen bg-white-500'>
				<div className='w-full my-auto'>
					<div className='w-full h-8 bg-gray-300 border border-gray-500 rounded'>
						<div
							className='h-8 bg-red-500'
							style={{ width: '80%' }}>
							Health: 80%
						</div>
					</div>
				</div>
				<div className='flex items-center'>
					<pre>
						const firstnumber = 5; <br />
						let totalSum = 0; <br />
						for(let i = 0; i &lg; firstnumber; i++) <br />
						&nbsp;&nbsp;&nbsp;totalSum = totalSum+1; <br />
						console.log("The TOTALSUM of number is: " + totalSum);
					</pre>
				</div>
			</div>
		</div>
	);
}
