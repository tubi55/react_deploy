import { FaBars, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../hooks/useGlobal';

export default function Header() {
	//순서1 - 커스텀훅으로부터 모바일패널 제어를 위한 상태값, 상태변경함수를 전역으로도 가져옴
	const { MobileOpen, setMobileOpen } = useGlobalState();
	const gnbArr = ['members', 'gallery', 'youtube', 'contact', 'posts'];
	const snsArr = [FaEnvelope, FaInstagram, FaYoutube];
	const { pathname } = useLocation();

	return (
		<>
			<header className={`header ${pathname === '/' && 'main'}`}>
				<h1>
					<Link to={'/'}>ALPACO</Link>
				</h1>

				<nav>
					<ul className='gnb'>
						{gnbArr.map((data, idx) => {
							return (
								<li key={idx} className={pathname === '/' + data ? 'on' : ''}>
									<Link to={'/' + data}>{data.toUpperCase()}</Link>
								</li>
							);
						})}
					</ul>

					<ul className='sns'>
						{snsArr.map((Data, idx) => (
							<li key={idx}>
								<Data />
							</li>
						))}
					</ul>
				</nav>

				{/* 순서2 - 모바일 호출버튼 클릭시 상태변경함수를 통해서 패널 열고 닫기 */}
				<span className='btnMobile' onClick={() => setMobileOpen(!MobileOpen)}>
					<FaBars />
				</span>
			</header>
		</>
	);
}
