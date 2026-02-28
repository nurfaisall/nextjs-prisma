import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
    const posts = await prisma.post.findMany(
        {
            include: {
                author: true,
            },
        }
    );

    return (
        <>
            <div className="flex justify-end px-4">
                <Link href="/post/new" className="text-sm text-white"> 
                    <div className="mt-4 p-4 bg-blue-600 rounded-3xl font-semibold hover:bg-blue-700 transition-colors">
                        Create Post
                    </div>
                </Link>
            </div>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 text-[#333333]">
                <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">Posts</h1>
                <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={"/post/" + post.id} className="text-lg hover:underline">
                                <span className="font-semibold">{post.title}</span>
                            </Link>
                            <span className="text-sm text-gray-600 ml-2">by {post.author?.name || "Unknown Author"} </span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}