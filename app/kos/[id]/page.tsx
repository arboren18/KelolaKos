import { getPenyewaList } from "@/lib/data";
import AddPenyewa from "./addPenyewa";
import DeletePenyewa from "./deletePenyewa";
import UpdatePenyewa from "./updatePenyewa";

export const metadata = {
	title: "Penyewa List"
};

export default async function PenyewaList({
	params
}: {
	params: { id: string };
}) {
	const daftarPenyewa = await getPenyewaList(params.id);

	return (
		<div className='py-10 px-10'>
			<div className='py-2'>
				<AddPenyewa idKos={params.id} />
			</div>
			<table className='table w-full'>
				<thead>
					<tr>
						<th>#</th>
						<th>Nama</th>
						<th>Nomor Kamar</th>
						<th>Status Pembayaran</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					{daftarPenyewa.map((penyewa, index) => (
						<tr key={penyewa.id}>
							<td>{index + 1}</td>
							<td>{penyewa.nama}</td>
							<td>{penyewa.nomorKamar}</td>
							<td>{penyewa.statusPembayaran}</td>
							<td className='flex'>
								<div className='mr-1'>
									<UpdatePenyewa {...penyewa} />
								</div>

								<DeletePenyewa {...penyewa} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
