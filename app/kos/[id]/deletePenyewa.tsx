"use client";

import { useState } from "react";
import { SubmitButton } from "@/components/button";
import { deletePenyewa } from "@/lib/actions";
import { Penyewa } from "@prisma/client";

export default function DeletePenyewa(penyewa: Penyewa) {
	const deleteById = deletePenyewa.bind(null, penyewa.id, penyewa.idKos);
	const [modal, setModal] = useState(false);

	function handleChange() {
		setModal(!modal);
	}

	return (
		<div>
			<button className='btn btn-error btn-sm' onClick={handleChange}>
				Delete
			</button>

			<input
				type='checkbox'
				checked={modal}
				onChange={handleChange}
				className='modal-toggle'
			/>

			<div className='modal'>
				<div className='modal-box'>
					<form action={deleteById}>
						<h3 className='font-bold text-lg'>
							Are sure to delete {penyewa.nama} ?
						</h3>
						<div className='modal-action'>
							<button type='button' className='btn' onClick={handleChange}>
								Close
							</button>
							<SubmitButton label='hapus' />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
