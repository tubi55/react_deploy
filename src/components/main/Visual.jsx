import { useFlickrQuery } from '../../hooks/useFlickr';
import Pic from '../common/Pic';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { EffectCoverflow } from 'swiper/modules';

export default function Visual() {
	const { data } = useFlickrQuery({ type: 'mine' });
	return (
		<figure className='visual'>
			<Swiper
				slidesPerView={3}
				spaceBetween={100}
				loop={true}
				effect={'coverflow'}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: true
				}}
				modules={[EffectCoverflow]}>
				{data?.map((pic, idx) => {
					if (idx >= 10) return null;
					return (
						<SwiperSlide key={idx}>
							<Pic src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`} style={{ width: '100%', height: '100%' }} shadow />
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
