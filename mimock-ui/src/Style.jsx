import React from 'react';
import { Button, Pill, CustomButton, IconButtonWithLabel } from 'styles';
import { PillVariants } from './styles/components/Pill';
import {
	ButtonVariants,
	IconButtonWithLabelVariants,
} from './styles/components/Button';

function Style() {
	return (
		<div data-testid='style' className='mt-10 text-3xl mx-auto w-screen'>
			<div className='w-full mb-20'>
				<div className='font-sans font-bold text-lg mb-10 ml-6'>Button</div>
				<div className='w-full grid grid-cols-4 gap-4 gap-y-8'>
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
						variant={ButtonVariants.DefaultButton}
						label='Default'
					></Button>
					<Button variant={ButtonVariants.TealButton} label='LOGIN'></Button>

					<CustomButton
						label='Custom1'
						color='text-white'
						bgcolor='bg-orange-400'
					></CustomButton>
					<CustomButton
						label='Custom2'
						color='text-white'
						bgcolor='bg-indigo-300'
					></CustomButton>

					<IconButtonWithLabel
						label='Add'
						variant={IconButtonWithLabelVariants.AddButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Close'
						variant={IconButtonWithLabelVariants.ClearButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Delete'
						variant={IconButtonWithLabelVariants.DeleteButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel
						label='Copy'
						variant={IconButtonWithLabelVariants.CopyButton}
					></IconButtonWithLabel>
					<IconButtonWithLabel label='Default'></IconButtonWithLabel>
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
