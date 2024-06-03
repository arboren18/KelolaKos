import Image from "next/image";
import { DeleteButton, EditButton } from "@/components/button";
import type { Kos } from "@prisma/client";
import Link from "next/link";

const Card = ({ data }: { data: Kos }) => {
	return (
		<div className='max-w-sm border border-gray-200 rounded-md shadow'>
			<Link href={`/kos/${data.id}`}>
				<div className='relative aspect-video'>
					<Image
						src={data.gambar}
						alt={data.nama}
						fill
						priority
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
						className='rounded-t-md object-cover'
					/>
				</div>
				<div className='p-5'>
					<h1 className='text-2xl font-bold text-gray-900 truncate'>
						{data.nama}
					</h1>
				</div>
			</Link>
			<div className='flex items-center justify-between'>
				<EditButton id={data.id} />
				<DeleteButton id={data.id} />
			</div>
		</div>
	);
};

export default Card;
