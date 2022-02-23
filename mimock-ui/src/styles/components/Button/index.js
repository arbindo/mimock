import Button from './DefaultButton/Button.jsx';
import CustomButton from './CustomButton/CustomButton.jsx';
import {
	IconButtonWithLabel,
	IconButtonWithoutLabel,
} from './IconButton/index';

export const ButtonVariants = {
	RedButton: 'RED_BUTTON',
	DarkRedButton: 'DARK_RED_BUTTON',
	GreenButton: 'GREEN_BUTTON',
	DarkGreenButton: 'DARK_GREEN_BUTTON',
	BlueButton: 'INDIGO_BUTTON',
	TealButton: 'TEAL_BUTTON',
	DefaultButton: 'DEFAULT_BUTTON',
};

export const IconButtonVariants = {
	ClearButton: 'CLEAR_BUTTON',
	DeleteButton: 'DELETE_BUTTON',
	AddButton: 'ADD_BUTTON',
	CopyButton: 'COPY_BUTTON',
	DefaultButton: 'DEFAULT_BUTTON',
};

export { Button, CustomButton, IconButtonWithLabel, IconButtonWithoutLabel };
