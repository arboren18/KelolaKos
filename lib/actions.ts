"use server";

import { z } from "zod";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StatusPembayaran, getKostById } from "@/lib/data";

const UploadSchema = z.object({
	nama: z.string().min(1),
	gambar: z
		.instanceof(File)
		.refine((file) => file.size > 0, { message: "Image is required" })
		.refine((file) => file.size === 0 || file.type.startsWith("image/"), {
			message: "Only images are allowed"
		})
		.refine((file) => file.size < 4000000, {
			message: "Image must less than 4MB"
		})
});

const EditSchema = z.object({
	nama: z.string().min(1),
	gambar: z
		.instanceof(File)
		.refine((file) => file.size === 0 || file.type.startsWith("image/"), {
			message: "Only images are allowed"
		})
		.refine((file) => file.size < 4000000, {
			message: "Image must less than 4MB"
		})
		.optional()
});

export const uploadKos = async (prevState: unknown, formData: FormData) => {
	const validatedFields = UploadSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors
		};
	}

	const { nama, gambar } = validatedFields.data;
	const { url } = await put(gambar.name, gambar, {
		access: "public",
		multipart: true
	});

	try {
		await prisma.kos.create({
			data: {
				nama: nama,
				gambar: url
			}
		});
	} catch (error) {
		return { message: "Gagal menambahkan data" };
	}

	revalidatePath("/");
	redirect("/");
};

// Update image
export const updateKos = async (
	id: string,
	prevState: unknown,
	formData: FormData
) => {
	const validatedFields = EditSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors
		};
	}

	const data = await getKostById(id);
	if (!data) return { message: "No Data Found" };

	const { nama, gambar } = validatedFields.data;
	let imagePath;
	if (!gambar || gambar.size <= 0) {
		imagePath = data.gambar;
	} else {
		await del(data.gambar);
		const { url } = await put(gambar.name, gambar, {
			access: "public",
			multipart: true
		});
		imagePath = url;
	}

	try {
		await prisma.kos.update({
			data: {
				nama: nama,
				gambar: imagePath
			},
			where: { id }
		});
	} catch (error) {
		return { message: "Gagal mengupdate data" };
	}

	revalidatePath("/");
	redirect("/");
};

// Delete Image
export const deleteKos = async (id: string) => {
	const data = await getKostById(id);
	if (!data) return { message: "No data found" };

	await del(data.gambar);
	try {
		await prisma.kos.delete({
			where: { id }
		});
	} catch (error) {
		return { message: "Gagal menghapus data" };
	}

	revalidatePath("/");
};

const PenyewaSchema = z.object({
	idKos: z.string(),
	nama: z.string().min(1),
	nomorKamar: z.preprocess((x) => (x ? x : undefined), z.coerce.number().int()),
	statusPembayaran: z.nativeEnum(StatusPembayaran)
});

export const addPenyewa = async (prevState: unknown, formData: FormData) => {
	const validatedFields = PenyewaSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors
		};
	}

	const { idKos, nama, nomorKamar, statusPembayaran } = validatedFields.data;

	try {
		await prisma.penyewa.create({
			data: {
				idKos,
				nama,
				nomorKamar,
				statusPembayaran: statusPembayaran.toString()
			}
		});
	} catch (error) {
		return { message: "Gagal menambahkan data" };
	}

	revalidatePath(`/kos/${idKos}`, "page");
};

export const updatePenyewa = async (
	id: string,
	prevState: unknown,
	formData: FormData
) => {
	const validatedFields = PenyewaSchema.safeParse(
		Object.fromEntries(formData.entries())
	);

	if (!validatedFields.success) {
		return {
			error: validatedFields.error.flatten().fieldErrors
		};
	}

	const { idKos, nama, nomorKamar, statusPembayaran } = validatedFields.data;

	try {
		await prisma.penyewa.update({
			data: {
				idKos,
				nama,
				nomorKamar,
				statusPembayaran: statusPembayaran.toString()
			},
			where: { id }
		});
	} catch (error) {
		return { message: "Gagal mengupdate data" };
	}

	revalidatePath(`/kos/${idKos}`, "page");
};

// Delete Image
export const deletePenyewa = async (id: string, idKos: string) => {
	try {
		await prisma.penyewa.delete({
			where: { id }
		});
	} catch (error) {
		return { message: "Gagal menghapus data" };
	}

	revalidatePath(`/kos/${idKos}`, "page");
};
