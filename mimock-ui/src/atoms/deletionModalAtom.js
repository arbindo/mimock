import { atom } from 'recoil';

const deletionModalAtom = atom({
	key: 'deletionModalAtom',
	default: false,
});

export default deletionModalAtom;
