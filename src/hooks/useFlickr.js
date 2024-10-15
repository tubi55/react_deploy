import { useQuery } from '@tanstack/react-query';

//fetchFn
const fetchFlickr = opt => {};

//useQuery를 활용한 실제 호출할 커스텀훅 등록
export const useFlickrQuery = opt => {
	return useQuery({
		queryKey: ['flickrQuery', opt],
		queryFn: fetchFlickr,
		staleTime: 1000 * 60,
		gcTime: 1000 * 60
	});
};
