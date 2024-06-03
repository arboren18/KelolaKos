"use client";
import React from "react";
import { uploadKos } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/button";

const CreateForm = () => {
	const [state, formAction] = useFormState(uploadKos, null);

	return (
		<form action={formAction}>
			{/* Alert */}
			{state?.message ? (
				<div
					className='p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50'
					role='alert'
				>
					<div className='font-medium'>{state?.message}</div>
				</div>
			) : null}

			<div className='mb-4 pt-2'>
				<input
					type='text'
					name='nama'
					className='py-2 px-4 rounded-sm border border-gray-400 w-full'
					placeholder='Nama...'
				/>
				<div aria-live='polite' aria-atomic='true'>
					<p className='text-sm text-red-500 mt-2'>{state?.error?.nama}</p>
				</div>
			</div>
			<div className='mb-4 pt-2'>
				<input
					type='file'
					name='gambar'
					className='file:py-2 file:px-4 file:mr-4 file:rounded-sm file:border-0 file:bg-gray-200 hover:file:bg-gray-300 file:cursor-pointer border border-gray-400 w-full'
				/>
				<div aria-live='polite' aria-atomic='true'>
					<p className='text-sm text-red-500 mt-2'>{state?.error?.gambar}</p>
				</div>
			</div>
			<div className='mb-4 pt-4'>
				<SubmitButton label='tambah' />
			</div>
		</form>
	);
};

export default CreateForm;
