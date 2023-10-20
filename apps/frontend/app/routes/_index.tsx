import axios from 'axios';
import { useEffect, useState } from 'react';
import { Market } from '../interface';
export default function Index() {
	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
			<WinMarketTable />
		</div>
	);
}

const WinMarketTable: React.FC = () => {
	const staticImage = [
		'b3-main.svg',
		'bf-main.svg',
		'ce-main.svg',
		'ee-main.svg',
		'fr-main.svg',
		'ld-main.svg',
		'oe-main.svg',
		'pp-main.svg',
		'un-main.svg',
		'wh-main.svg',
	];
	const [data, setData] = useState({} as Market);

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	};

	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/market');

			if (response.data) {
				setData(response.data);
			}
		} catch (error) {}
	};
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<div>
			<div style={{ width: '100%', flexDirection: 'row' }}>
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					{data?.displayName}
				</div>
				<div
					className="test"
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						width: '100vw',
					}}
				>
					{/* <div style={{ display: "flex", flexDirection: "row" }}> */}
					<div style={{ width: '30%' }}></div>
					<div
						style={{
							display: 'grid',
							justifyContent: 'flex-end',
							gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
							columnGap: '20px',
							flex: 1,
						}}
					>
						{data?.bookmakers?.map((col, idx) => (
							<div
								key={idx}
								style={{
									height: '100px',
									width: 'auto',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: '20px',
									backgroundColor: `${getRandomColor()}`,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<img
									src={`/img/${staticImage.find(e =>
										e.startsWith(col?.bookmakerCode?.toLowerCase()),
									)}`}
									alt={staticImage.find(e =>
										e.startsWith(col?.bookmakerCode?.toLowerCase()),
									)}
									style={{
										width: '100px',
										position: 'absolute',
										top: '50%',
										left: '50%',
										transform: 'translate(-50%, -50%) rotate(-90deg)',
										padding: '8px',
									}}
								/>
							</div>
						))}
						{/* </div> */}
					</div>
				</div>
			</div>
			{data?.bets?.map((row, idx) => (
				<div style={{ width: '100%', flexDirection: 'row' }}>
					<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
						{row.displayName}
					</div>
					<div
						className="test"
						style={{
							display: 'flex',
							justifyContent: 'flex-end',
							width: '100vw',
						}}
					>
						{/* <div style={{ display: "flex", flexDirection: "row" }}> */}
						<div style={{ width: '30%' }}></div>
						<div
							style={{
								display: 'grid',
								justifyContent: 'flex-end',
								gridTemplateColumns: 'repeat(auto-fill, minmax(50px, 1fr))',
								columnGap: '20px',
								flex: 1,
							}}
						>
							{row.odds.map((odd, colIdx) => (
								<div
									key={colIdx}
									style={{
										padding: '0.5rem',
										width: '50px',
										textAlign: 'center',
										borderRadius: '20px',
										display: 'flex',
										justifyContent: 'center',
										alignContent: 'center',
										border: `1px solid ${getRandomColor()}`,
									}}
								>
									{odd.odds}
								</div>
							))}
							{/* </div> */}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
