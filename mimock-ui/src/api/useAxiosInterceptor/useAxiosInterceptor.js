import { useRecoilState } from 'recoil';
import showFullPageLoader from 'atoms/showFullPageLoader';
import { client } from '../AxiosClient';

export default function useAxiosInterceptor() {
	const [, setLoading] = useRecoilState(showFullPageLoader);

	const onRequestFulfilled = (config) => {
		const { showFullPageLoader } = config;
		if (showFullPageLoader) {
			setLoading(true);
		}
		return config;
	};

	const onRequestFailed = (err) => Promise.reject(err);

	const onResponseFulfilled = (response) => {
		setLoading(false);
		return response;
	};

	const onResponseCalled = (err) => {
		setLoading(false);
		return Promise.reject(err);
	};

	client.interceptors.request.use(onRequestFulfilled, onRequestFailed);
	client.interceptors.response.use(onResponseFulfilled, onResponseCalled);
}
