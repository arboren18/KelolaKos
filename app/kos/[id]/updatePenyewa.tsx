"use client";

import { useEffect, useState } from "react";
import { Penyewa } from "@prisma/client";
import { SubmitButton } from "@/components/button";
import { useFormState } from "react-dom";
import { updatePenyewa } from "@/lib/actions";
import { StatusPembayaran } from "@/lib/data";

export default function UpdatePenyewa(penyewa: Penyewa) {
	const [state, formAction] = useFormState(
		updatePenyewa.bind(null, penyewa.id),
		null
	);
	const [modal, setModal] = useState(false);

	function handleChange() {
		setModal(!modal);
	}

	useEffect(() => {
		setModal(false);
	}, [state]);

	return (
		<div>
			<button className='btn btn-info btn-sm' onClick={handleChange}>
				Edit
			</button>

			<input
				type='checkbox'
				checked={modal}
				onChange={handleChange}
				className='modal-toggle'
			/>

			<div className='modal'>
				<div className='modal-box'>
					<h3 className='font-bold text-lg'>Edit {penyewa.nama}</h3>
					<form action={formAction}>
						<input type='hidden' name='idKos' value={penyewa.idKos} />
						<div className='form-control'>
							<label className='label font-bold'>Nama</label>
							<input
								type='text'
								name='nama'
								className='input w-full input-bordered'
								placeholder='Nama'
								defaultValue={penyewa.nama}
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
								defaultValue={penyewa.nomorKamar}
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
								defaultValue={penyewa.statusPembayaran}
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
						<div className='modal-action'>
							<button type='button' className='btn' onClick={handleChange}>
								Close
							</button>
							<SubmitButton label='edit' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
