import { useEffect, useRef, useState } from 'react';
import Layout from '../common/Layout';
import Pic from '../common/Pic';
import Modal from '../common/Modal';
import Content from '../common/Content';
import { useFlickrQuery } from '../../hooks/useFlickr';
import { useGlobalState } from '../../hooks/useGlobal';

export default function Gallery() {
	console.log('Gallery');
	const { store, dispatch } = useGlobalState();

	const ref_gallery = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Type, setType] = useState({ type: 'mine' });
	const { data: Flickr } = useFlickrQuery(Type);

	const customMotion = {
		init: { opacity: 0, x: 200 },
		active: { opacity: 1, x: 0 },
		end: { opacity: 0, x: -200 }
	};

	const handleSearch = e => {
		e.preventDefault();
		if (!e.target[0].value.trim()) return alert('검색어를 입력해주세요.');
		setType({ type: 'search', tag: e.target[0].value });
		e.target[0].value = '';
	};

	useEffect(() => {
		ref_gallery.current.classList.remove('on');

		setTimeout(() => {
			ref_gallery.current.classList.add('on');
		}, 800);
	}, [Type]);

	useEffect(() => {
		document.body.style.overflow = store.isModal ? 'hidden' : 'auto';
	}, [store.isModal]);

	return (
		<>
			<Layout title={'GALLERY'}>
				<Content delay={1.5} customMotion={customMotion}>
					<article className='controller'>
						<ul className='type'>
							{/* className을 조건처리할때는 &&연산자 사용불가 : className에는 boolean이 아닌 문자값이 와야됨 */}
							<li onClick={() => setType({ type: 'mine' })} className={Type.type === 'mine' ? 'on' : ''}>
								My Gallery
							</li>
							<li onClick={() => setType({ type: 'interest' })} className={Type.type === 'interest' ? 'on' : ''}>
								Interest Gallery
							</li>
						</ul>

						<form onSubmit={handleSearch}>
							<input type='text' placeholder='검색어를 입력하세요.' />
							<button>search</button>
						</form>
					</article>

					<section className='galleryList' ref={ref_gallery}>
						{Flickr?.length === 0 && <p>해당 검색어의 검색 결과가 없습니다.</p>}
						{Flickr?.map((data, idx) => {
							return (
								<article
									key={idx}
									onClick={() => {
										dispatch({ type: 'OPEN_MODAL' });
										setIndex(idx);
									}}>
									<Pic src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`} className='pic' shadow />
									{/* <h3>{data.title}</h3> */}
								</article>
							);
						})}
					</section>
				</Content>
			</Layout>

			{store.isModal && (
				<Modal>
					<Pic src={`https://live.staticflickr.com/${Flickr[Index].server}/${Flickr[Index].id}_${Flickr[Index].secret}_b.jpg`} shadow />
				</Modal>
			)}
		</>
	);
}
