import { atom } from 'recoil';

const editUserDetailsAtom = atom({
	key: 'editUserDetailsAtom',
	default: {
		userName: '',
		name: '',
		userRole: '',
		isUserActive: false,
		userCreatedAt: null,
		passwordUpdatedAt: null,
	},
});

export default editUserDetailsAtom;
