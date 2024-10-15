import { useQuery } from '@tanstack/react-query';

//미션 (1시 40분까지)
//Gallery컴포넌트에 있는 fetch함수를 아래 fetchFlickr에 적용
//Gallery컴포넌트에서 아래 훅 호출한 뒤 데이터 출력

//fetchFn
const fetchFlickr = async ({ queryKey }) => {
	console.log(queryKey[1]); //{type:'mine'}
	const baseURL = 'https://www.flickr.com/services/rest/';
	const method_mine = 'flickr.people.getPhotos';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';

	const flickr_api = import.meta.env.VITE_FLICKR_API;
	const myID = '197119297@N02';
	const num = 20;
	let url = '';
	const urlMine = `${baseURL}?method=${method_mine}&api_key=${flickr_api}&user_id=${myID}&per_page=${num}&nojsoncallback=1&format=json`;
	const urlInterest = `${baseURL}?method=${method_interest}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json`;
	const urlSearch = `${baseURL}?method=${method_search}&api_key=${flickr_api}&per_page=${num}&nojsoncallback=1&format=json&tags=${queryKey[1].tag}`;

	queryKey[1].type === 'mine' && (url = urlMine);
	queryKey[1].type === 'interest' && (url = urlInterest);
	queryKey[1].type === 'search' && (url = urlSearch);

	const data = await fetch(url);
	const json = await data.json();
	return json.photos.photo;
};

//useQuery를 활용한 실제 호출할 커스텀훅 등록
export const useFlickrQuery = opt => {
	return useQuery({
		queryKey: ['flickrQuery', opt],
		queryFn: fetchFlickr,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};
