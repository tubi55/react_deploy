import { useYoutubeQuery } from '../../hooks/useYoutube';
import Layout from '../common/Layout';
import Pic from '../common/Pic';

export default function Home() {
	const { data } = useYoutubeQuery();

	return (
		<Layout title={'HOME'}>
			<div style={{ display: 'flex', gap: 40 }}>
				{data?.map((vid, idx) => {
					if (idx >= 3) return null;
					return (
						<article key={idx}>
							<Pic src={vid.snippet.thumbnails.high.url} style={{ width: 400, height: 200 }} shadow />
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
