import { atom } from 'recoil';

const pageNumberAtom = atom({
	key: 'pageNumberAtom',
	default: 0,
});

export default pageNumberAtom;
