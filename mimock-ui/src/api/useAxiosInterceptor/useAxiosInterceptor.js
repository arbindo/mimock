import { useRecoilState } from 'recoil';
import showFullPageLoader from 'atoms/showFullPageLoader';
import { client } from '../AxiosClient';

export default function useAxiosInterceptor() {
	const [, setLoading] = useRecoilState(showFullPageLoader);

	client.interceptors.request.use(
		(config) => {
			setLoading(true);
			return config;
		},
		(err) => {
			return Promise.reject(err);
		}
	);

	client.interceptors.response.use(
		(response) => {
			setLoading(false);
			return response;
		},
		(err) => {
			setLoading(false);
			return Promise.reject(err);
		}
	);
}
