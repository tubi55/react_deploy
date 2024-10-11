import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [Roadview, setRoadview] = useState(false);

	const ref_mapFrame = useRef(null);
	const ref_viewFrame = useRef(null);
	const ref_instMap = useRef(null);
	const ref_instView = useRef(null);
	const ref_instClient = useRef(new kakao.maps.RoadviewClient());
	//통일성을 주기위해 타입,줌 컨트롤 인스턴스도 참조객체에 담음
	const ref_instType = useRef(new kakao.maps.MapTypeControl());
	const ref_instZoom = useRef(new kakao.maps.ZoomControl());

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

	useEffect(() => {
		[setTraffic, setRoadview].forEach(func => func(false));
		ref_mapFrame.current.innerHTML = '';
		ref_instMap.current = new kakao.maps.Map(ref_mapFrame.current, { center: latlng });
		inst_marker.setMap(ref_instMap.current);
		// 타입, 줌인스턴스가 담긴 참조객체를 반복돌며 addControl 메서드 호출
		[ref_instType.current, ref_instZoom.current].forEach(inst => ref_instMap.current.addControl(inst));
		ref_instView.current = new kakao.maps.Roadview(ref_viewFrame.current);
		ref_instClient.current.getNearestPanoId(latlng, 50, panoId => ref_instView.current.setPanoId(panoId, latlng));

		window.addEventListener('resize', initPos);
		return () => window.removeEventListener('resize', initPos);
	}, [Index]);

	useEffect(() => {
		Traffic
			? ref_instMap.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: ref_instMap.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure className='mapFrame'>
				<article ref={ref_mapFrame} className={`mapFrame ${!Roadview && 'on'}`}></article>
				<article ref={ref_viewFrame} className={`viewFrame ${Roadview && 'on'}`}></article>
			</figure>

			<nav className='btnSet'>
				<ul className='branch'>
					{ref_info.current.map((el, idx) => (
						<li key={idx} className={idx === Index ? 'on' : ''} onClick={() => setIndex(idx)}>
							{el.title}
						</li>
					))}
				</ul>

				<ul className='btnToggleSet'>
					<li onClick={() => setTraffic(!Traffic)} className={Traffic ? 'on' : ''}>
						{`Traffic ${Traffic ? 'OFF' : 'ON'}`}
					</li>
					<li onClick={() => setRoadview(!Roadview)} className={Roadview ? 'on' : ''}>
						{`Roadview ${Roadview ? 'OFF' : 'ON'}`}
					</li>
				</ul>
			</nav>
		</section>
	);
}
