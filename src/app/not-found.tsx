import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-20">
      <div className="panel rounded-lg p-8">
        <h1 className="text-3xl font-semibold text-cyan-50">页面不存在</h1>
        <p className="mt-4 text-slate-300">这个地址没有对应的内容。</p>
        <Link href="/" className="mt-6 inline-block text-cyan-100">
          返回首页
        </Link>
      </div>
    </main>
  );
}
