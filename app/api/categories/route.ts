import prisma from "@/lib/prisma";

export async function GET(){
    try{
        const categories=await prisma.category.findMany({})
        return new Response(JSON.stringify(categories));
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch categories' }), { status: 500 });
    }
}