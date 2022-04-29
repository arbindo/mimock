import { Store } from 'react-notifications-component';

const useNotification = ({
	type = 'default',
	title = 'Notification',
	message = 'Hello There',
	position = 'top-right',
	animationIn = 'animated_fadeIn',
	animationOut = 'animated_fadeOut',
}) => {
	Store.addNotification({
		title,
		message,
		type,
		insert: 'top',
		container: position,
		animationIn: ['animate__animated', animationIn],
		animationOut: ['animate__animated', animationOut],
		dismiss: {
			duration: 5000,
			showIcon: true,
		},
	});
};

export default useNotification;
