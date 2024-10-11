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

	//타입컨트롤, 줌컨트롤 인스턴스 생성
	const instType = new kakao.maps.MapTypeControl();
	const instZoom = new kakao.maps.ZoomControl();

	const initPos = () => {
		console.log('initPos called!!');
		ref_instMap.current.setCenter(latlng);
	};

	useEffect(() => {
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);

		//타입,줌 컨트롤러 인스턴스 반복돌며 맵 인스턴스 위에 바인딩
		//Index가 변경될때마다 새로운 지도 인스턴스가 생성되므로 생성된 인스턴스 위에 컨트롤러를 바인딩하기 위해 해당 useEffect안쪽에서 호출
		[instType, instZoom].forEach(inst => ref_instMap.current.addControl(inst));
	}, [Index]);

	useEffect(() => {
		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
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
/*
  미션 (2시 45분까지)
  - 지도에 컨트롤 올리기 샘플 가이드 문서를 통해 리액트 구조에 맞게 적용
*/
