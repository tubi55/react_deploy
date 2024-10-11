import { useEffect, useRef, useState } from 'react';

export default function Map() {
	const { kakao } = window;
	const ref_mapFrame = useRef(null);
	//지점 정보를 변경하기 위한 데이터 순번을 state에 저장
	//이후 인스턴스 호출하는 구문에 일괄적으로 Index값 연동
	const [Index, setIndex] = useState(0);

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

	const inst_markerImg = new kakao.maps.MarkerImage(
		ref_info.current[Index].markerImg,
		ref_info.current[Index].markerSize,
		ref_info.current[Index].markerOffset
	);

	const inst_marker = new kakao.maps.Marker({ position: ref_info.current[Index].latlng, image: inst_markerImg });

	useEffect(() => {
		const inst_map = new kakao.maps.Map(ref_mapFrame.current, { center: ref_info.current[Index].latlng });
		inst_marker.setMap(inst_map);
	}, []);

	return (
		<section className='map'>
			<h2>Location</h2>

			<figure ref={ref_mapFrame} className='mapFrame'></figure>
		</section>
	);
}

/*
  미션 (11시 23분)
  - 지도 출력 박스 밑에 참조객체 담겨있는 지점정보 배열을 활요하여 동적으로 지점 버튼 3개 출력
  - 이때 title정보값으로 버튼 이름 활용
  - 버튼 클릭시 Index 상태값을 변경해 바뀐 순번의 지점 정보로 화면이 갱신되도록 이벤트 처리
*/
