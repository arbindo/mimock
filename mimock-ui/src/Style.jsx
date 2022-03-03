import React from 'react';
import {
	Button,
	Pill,
	CustomButton,
	IconButtonWithLabel,
	IconButtonWithoutLabel,
	BasicTextField,
	PasswordField,
} from 'styles';
import { PillVariants } from './styles/components/Pill';
import { ButtonVariants, IconButtonVariants } from './styles/components/Button';

function Style() {
	return (
		<div data-testid='style' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-10 ml-6 dark:text-gray-100'>
					Button
				</div>
				<div className='w-full grid grid-cols-4 gap-4 gap-y-8'>
					<Button
						variant={ButtonVariants.RedButton}
						width='w-5/6'
						label='Cancel'
					></Button>
					<Button
						variant={ButtonVariants.GreenButton}
						width='w-1/2'
						label='Success'
					></Button>
					<Button
						variant={ButtonVariants.DarkRedButton}
						label='Cancel'
					></Button>
					<Button
						variant={ButtonVariants.DarkGreenButton}
						width='w-1/2'
						label='Success'
					></Button>
					<Button variant={ButtonVariants.BlueButton} label='Primary'></Button>
					<Button
						variant={ButtonVariants.DefaultButton}
						width='w-3/4'
						label='Default'
					></Button>
					<Button variant={ButtonVariants.TealButton} label='LOGIN'></Button>

					<CustomButton
						label='Custom1'
						color='text-white'
						background='bg-orange-400'
					></CustomButton>
					<CustomButton
						label='Custom2'
						color='text-white'
						background='bg-indigo-300'
					></CustomButton>

					<IconButtonWithLabel
						label='Add'
						width='w-1/3'
						variant={IconButtonVariants.AddButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Close'
						width='w-1/2'
						variant={IconButtonVariants.ClearButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Delete'
						variant={IconButtonVariants.DeleteButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Copy'
						width='w-1/2'
						variant={IconButtonVariants.CopyButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel label='Default'></IconButtonWithLabel>

					<IconButtonWithoutLabel
						variant={IconButtonVariants.AddButton}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						variant={IconButtonVariants.ClearButton}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						variant={IconButtonVariants.DeleteButton}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						variant={IconButtonVariants.CopyButton}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel></IconButtonWithoutLabel>
				</div>
			</div>

			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-20 ml-6 dark:text-gray-100'>
					Pills
				</div>
				<div className='w-full grid grid-cols-4 gap-4 gap-y-8'>
					<Pill variant={PillVariants.RedPill} label='CANCEL'></Pill>
					<Pill variant={PillVariants.GreenPill} label='SUCCESS'></Pill>
					<Pill variant={PillVariants.YellowPill} label='WARNING'></Pill>
					<Pill variant={PillVariants.DefaultPill} label='DEFAULT'></Pill>
				</div>
			</div>

			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-20 ml-6 dark:text-gray-100'>
					Text Field
				</div>
				<div className='w-full grid grid-cols-4 gap-4 gap-y-8 ml-20'>
					<BasicTextField
						label='Username'
						errorLabel='username is required'
						isError={false}
					></BasicTextField>
					<PasswordField></PasswordField>
				</div>
			</div>
		</div>
	);
}

export default Style;
