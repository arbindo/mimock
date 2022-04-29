import useNotification from './useNotification';
import { renderHook, act } from '@testing-library/react-hooks';

let mockAddNotification;
jest.mock('react-notifications-component', () => {
	mockAddNotification = jest.fn();
	const Store = {
		addNotification: mockAddNotification,
	};
	return { Store };
});

describe('userNotification', () => {
	it('should add new notification with default values', async () => {
		await act(async () => {
			renderHook(() => useNotification({}));
		});

		expect(mockAddNotification).toHaveBeenCalledTimes(1);
	});

	it('should add new notification with passed values', async () => {
		await act(async () => {
			renderHook(() =>
				useNotification({
					type: 'success',
					title: 'Success',
					message: 'Successfully added',
					position: 'top-left',
					animationIn: 'animate__bounceIn',
					animationOut: 'animate__bounceOut',
				})
			);
		});

		expect(mockAddNotification).toHaveBeenCalledTimes(1);
		expect(mockAddNotification).toHaveBeenCalledWith({
			title: 'Success',
			message: 'Successfully added',
			type: 'success',
			insert: 'top',
			container: 'top-left',
			animationIn: ['animate__animated', 'animate__bounceIn'],
			animationOut: ['animate__animated', 'animate__bounceOut'],
			dismiss: {
				duration: 5000,
				showIcon: true,
			},
		});
	});
});
