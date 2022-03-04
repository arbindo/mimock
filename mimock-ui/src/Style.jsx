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
						dataTestid='default-button-test-1'
						variant={ButtonVariants.RedButton}
						width='w-5/6'
						label='Cancel'
						onclickHandler={() => {
							console.log('Clicked cancel button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-2'
						ˇ
						variant={ButtonVariants.GreenButton}
						width='w-1/2'
						label='Success'
						onclickHandler={() => {
							console.log('Clicked success button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-3'
						variant={ButtonVariants.DarkRedButton}
						label='Cancel'
						onclickHandler={() => {
							console.log('Clicked cancel button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-4'
						variant={ButtonVariants.DarkGreenButton}
						width='w-1/2'
						label='Success'
						onclickHandler={() => {
							console.log('Clicked success button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-5'
						variant={ButtonVariants.BlueButton}
						label='Primary'
						onclickHandler={() => {
							console.log('Clicked primary button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-6'
						variant={ButtonVariants.DefaultButton}
						width='w-3/4'
						label='Default'
						onclickHandler={() => {
							console.log('Clicked default button');
						}}
					></Button>
					<Button
						dataTestid='default-button-test-7'
						variant={ButtonVariants.TealButton}
						label='LOGIN'
						onclickHandler={() => {
							console.log('Clicked login button');
						}}
					></Button>

					<CustomButton
						dataTestid='custom-button-test-1'
						label='Custom1'
						color='text-white'
						background='bg-orange-400'
						onclickHandler={() => {
							console.log('Clicked custom button');
						}}
					></CustomButton>
					<CustomButton
						dataTestid='custom-button-test-2'
						label='Custom2'
						color='text-white'
						background='bg-indigo-300'
						onclickHandler={() => {
							console.log('Clicked custom button');
						}}
					></CustomButton>

					<IconButtonWithLabel
						dataTestid='icon-with-label-button-test-1'
						label='Add'
						width='w-1/3'
						variant={IconButtonVariants.AddButton}
						onclickHandler={() => {
							console.log('Clicked add icon button');
						}}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						dataTestid='icon-with-label-button-test-2'
						label='Close'
						width='w-1/2'
						variant={IconButtonVariants.ClearButton}
						onclickHandler={() => {
							console.log('Clicked clear icon button');
						}}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						dataTestid='icon-with-label-button-test-3'
						label='Delete'
						variant={IconButtonVariants.DeleteButton}
						onclickHandler={() => {
							console.log('Clicked delete icon button');
						}}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						dataTestid='icon-with-label-button-test-4'
						label='Copy'
						width='w-1/2'
						variant={IconButtonVariants.CopyButton}
						onclickHandler={() => {
							console.log('Clicked copy icon button');
						}}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						dataTestid='icon-with-label-button-test-5'
						label='Default'
						onclickHandler={() => {
							console.log('Clicked default icon button');
						}}
					></IconButtonWithLabel>

					<IconButtonWithoutLabel
						dataTestid='icon-without-label-button-test-1'
						variant={IconButtonVariants.AddButton}
						onclickHandler={() => {
							console.log('Clicked add icon button');
						}}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						dataTestid='icon-without-label-button-test-2'
						variant={IconButtonVariants.ClearButton}
						onclickHandler={() => {
							console.log('Clicked clear icon button');
						}}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						dataTestid='icon-without-label-button-test-3'
						variant={IconButtonVariants.DeleteButton}
						onclickHandler={() => {
							console.log('Clicked delete icon button');
						}}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						dataTestid='icon-without-label-button-test-4'
						variant={IconButtonVariants.CopyButton}
						onclickHandler={() => {
							console.log('Clicked copy icon button');
						}}
					></IconButtonWithoutLabel>
					<IconButtonWithoutLabel
						dataTestid='icon-without-label-button-test-5'
						onclickHandler={() => {
							console.log('Clicked default icon button');
						}}
					></IconButtonWithoutLabel>
				</div>
			</div>

			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-20 ml-6 dark:text-gray-100'>
					Pills
				</div>
				<div className='w-full grid grid-cols-4 gap-4 gap-y-8'>
					<Pill
						dataTestid='pill-test-1'
						variant={PillVariants.RedPill}
						label='CANCEL'
						onclickHandler={() => {
							console.log('Clicked cancel pill');
						}}
					></Pill>
					<Pill
						dataTestid='pill-test-2'
						variant={PillVariants.GreenPill}
						label='SUCCESS'
						onclickHandler={() => {
							console.log('Clicked success pill');
						}}
					></Pill>
					<Pill
						dataTestid='pill-test-3'
						variant={PillVariants.YellowPill}
						label='WARNING'
						onclickHandler={() => {
							console.log('Clicked warning pill');
						}}
					></Pill>
					<Pill
						dataTestid='pill-test-4'
						variant={PillVariants.DefaultPill}
						label='DEFAULT'
						onclickHandler={() => {
							console.log('Clicked default pill');
						}}
					></Pill>
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
