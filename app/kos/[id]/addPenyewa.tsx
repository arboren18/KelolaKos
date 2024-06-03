"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addPenyewa } from "@/lib/actions";
import { SubmitButton } from "@/components/button";
import { StatusPembayaran } from "@/lib/data";

export default function AddPenyewa({ idKos }: { idKos: string }) {
	const [state, formAction] = useFormState(addPenyewa, null);
	const [modal, setModal] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	function handleChange() {
		setModal(!modal);
	}

	useEffect(() => {
		if (!state?.message) {
			setModal(false);
			formRef.current?.reset();
		}
	}, [state]);

	return (
		<div>
			<button className='btn' onClick={handleChange}>
				Tambah
			</button>

			<input
				type='checkbox'
				checked={modal}
				onChange={handleChange}
				className='modal-toggle'
			/>

			<div className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Tambah penyewa</h3>
					<form action={formAction} ref={formRef}>
						<input type='hidden' name='idKos' value={idKos} />

						<div className='form-control'>
							<label className='label font-bold'>Nama</label>
							<input
								type='text'
								name='nama'
								className='input w-full input-bordered'
								placeholder='Nama'
							/>
							<div aria-live='polite' aria-atomic='true'>
								<p className='text-sm text-red-500 mt-2'>
									{state?.error?.nama}
								</p>
							</div>
						</div>
						<div className='form-control'>
							<label className='label font-bold'>Nomor kamar</label>
							<input
								type='number'
								name='nomorKamar'
								className='input w-full input-bordered'
								placeholder='Nomor kamar'
							/>
							<div aria-live='polite' aria-atomic='true'>
								<p className='text-sm text-red-500 mt-2'>
									{state?.error?.nomorKamar}
								</p>
							</div>
						</div>
						<div className='form-control'>
							<label className='label font-bold'>Status Pembayaran</label>
							<select
								name='statusPembayaran'
								className='input w-full input-bordered'
							>
								<option value='' disabled>
									Pilih Status Pembayaran
								</option>
								{Object.values(StatusPembayaran).map((value) => (
									<option key={value} value={value}>
										{value}
									</option>
								))}
							</select>
							<div aria-live='polite' aria-atomic='true'>
								<p className='text-sm text-red-500 mt-2'>
									{state?.error?.statusPembayaran}
								</p>
							</div>
						</div>
						<div aria-live='polite' aria-atomic='true'>
							<p className='text-sm text-red-500 mt-2'>{state?.message}</p>
						</div>
						<div className='modal-action'>
							<button type='button' className='btn' onClick={handleChange}>
								Close
							</button>
							<SubmitButton label='tambah' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
