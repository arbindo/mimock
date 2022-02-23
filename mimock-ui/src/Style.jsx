import React from 'react';
import { Button, Pill, CustomButton } from 'styles';
import { PillVariants } from './styles/components/Pill';
import { ButtonVariants } from './styles/components/Button';

function Style() {
	return (
		<div data-testid='style' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-20 ml-6'>Button</div>
				<div className='w-full flex justify-evenly flex-wrap'>
					<Button variant={ButtonVariants.RedButton} label='Cancel'></Button>
					<Button variant={ButtonVariants.GreenButton} label='Success'></Button>
					<Button
						variant={ButtonVariants.DarkRedButton}
						label='Cancel'
					></Button>
					<Button
						variant={ButtonVariants.DarkGreenButton}
						label='Success'
					></Button>
					<Button variant={ButtonVariants.BlueButton} label='Primary'></Button>
					<Button
						variant={ButtonVariants.defaultButton}
						label='Default'
					></Button>
					<CustomButton
						label='Custom Button'
						color='text-indigo-500'
						bgcolor='bg-indigo-200'
					></CustomButton>
				</div>
			</div>

			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-20 ml-6'>Pills</div>
				<div className='w-full flex flex-wrap justify-evenly'>
					<Pill variant={PillVariants.RedPill} label='CANCEL'></Pill>
					<Pill variant={PillVariants.GreenPill} label='SUCCESS'></Pill>
					<Pill variant={PillVariants.YellowPill} label='WARNING'></Pill>
					<Pill variant={PillVariants.DefaultPill} label='DEFAULT'></Pill>
				</div>
			</div>
		</div>
	);
}

export default Style;
