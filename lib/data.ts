import { prisma } from "@/lib/prisma";

export enum StatusPembayaran {
	LUNAS = "Lunas",
	BELUM_LUNAS = "Belum lunas"
}

export const getKostList = async () => {
	try {
		const result = await prisma.kos.findMany({
			orderBy: { createdAt: "desc" }
		});
		return result;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export const getPenyewaList = async (id: string) => {
	try {
		const result = await prisma.penyewa.findMany({
			where: { idKos: id },
			orderBy: { createdAt: "desc" }
		});
		return result;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};

export const getKostById = async (id: string) => {
	try {
		const result = await prisma.kos.findUnique({
			where: { id }
		});
		return result;
	} catch (error) {
		throw new Error("Failed to fetch data");
	}
};
