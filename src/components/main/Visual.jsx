import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import 'swiper/css';

export default function Visual() {
	const [Index, setIndex] = useState(0);
	const { data, isSuccess } = useFlickrQuery({ type: 'mine' });

	return (
		<figure className='visual'>
			<div className='textBox'>
				{data?.map((el, idx) => (
					<h2 key={idx} className={Index === idx ? 'on' : ''}>
						{el.title.substr(0, 30)}
					</h2>
				))}
			</div>

			<Swiper
				modules={[Autoplay]}
				slidesPerView={3}
				spaceBetween={100}
				loop={true}
				centeredSlides={true}
				onSlideChange={el => setIndex(el.realIndex)}
				autoplay={{
					delay: 1000,
					disableOnInteraction: true
				}}
				onSwiper={swiper => {
					console.log(swiper);
					setTimeout(() => {
						swiper.autoplay.start();
					}, 1000);
				}}>
				{isSuccess &&
					data.map((pic, idx) => {
						if (idx >= 10) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} style={{ width: '100%', height: '100%' }} shadow />
								</div>
							</SwiperSlide>
						);
					})}
			</Swiper>
		</figure>
	);
}
