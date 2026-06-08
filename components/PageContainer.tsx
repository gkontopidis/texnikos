export default function PageContainer({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-slate-600">{subtitle}</p>}
      </div>
      <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
        {children}
      </div>
    </main>
  );
}
