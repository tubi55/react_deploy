import Layout from '../common/Layout';
import Pic from '../common/Pic';
import useShortenText from '../../hooks/useShortenText';
import useCombineText from '../../hooks/useCombineText';
import { Link } from 'react-router-dom';
import Content from '../common/Content';
import { useYoutubeQuery } from '../../hooks/useYoutube';

export default function Youtube() {
	const shortenText = useShortenText();
	const combineText = useCombineText();

	//useQuery기능이 내장된 유튜브데이터 가져오는 커스텀훅 호출
	const result = useYoutubeQuery();
	console.log(result);

	return (
		<Layout title={'YOUTUBE'}>
			{/* <Content delay={1}>
				{Vids.map((vid, idx) => {
					return (
						<article key={idx}>
							<h3>
								<Link to={'/youtube/' + vid.id}>{shortenText(vid.snippet.title, 60)}</Link>
							</h3>
							<div className='txt'>
								<p>{shortenText(vid.snippet.description, 150)}</p>
								<span>{combineText(vid.snippet.publishedAt.split('T')[0], '-', '.')}</span>
							</div>
							<Pic className='thumb' src={vid.snippet.thumbnails.high.url} />
						</article>
					);
				})}
			</Content> */}
		</Layout>
	);
}
