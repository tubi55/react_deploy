import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);
	const [Index, setIndex] = useState(0);
	const ref_instMap = useRef(null);
	const ref_info = useRef([
		{
			title: 'COEX',
			latlng: new kakao.maps.LatLng(37.5094091584729, 127.0624304750884),
			markerImg: 'marker1.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerOffset: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: 'NEXON',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			markerImg: 'marker2.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: 'CITYHALL',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			markerImg: 'marker3.png',
			markerSize: new kakao.maps.Size(232, 99),
			markerPos: { offset: new kakao.maps.Point(116, 99) }
		}
	]);
	const { latlng, markerImg, markerSize, markerPos } = ref_info.current[Index];

	const inst_marker = new kakao.maps.Marker({
		position: latlng,
		image: new kakao.maps.MarkerImage(markerImg, markerSize, markerPos)
	});

	const initPos = () => {
		console.log('initPos called!!');
		ref_instMap.current.setCenter(latlng);
	};

	//Index값이 변경될때마다 실행할 useEffect (새로운 Index값으로 지도 인스턴스 갱신)
	useEffect(() => {
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);
	}, [Index]);

	//컴포넌트 언마운트시 한번만 윈도우 이벤트 제거하기 위해 의존성 배열이 비어있는 useEffect 이벤트 연결
	useEffect(() => {
		window.addEventListener('resize', initPos);
		//clean up 함수 - 컴포넌트 언마운트 한번만 호출
		return () => {
			//window객체에 이벤트 핸들러 연결시에는 설사 해당 컴포넌트가 언마운트되더라도 계속해서 윈도우 전역객체에 등록되어 있음
			///해결 방법 : clean-up함수를 활용해서 컴포넌트 언마운트시 강제로 window객체에 연결한 핸들러함수를 직접 제거
			console.log('Map Unmounted!! initPos handler removed');
			window.removeEventListener('resize', initPos);
		};
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>

			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.current.map((el, idx) => (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
}
