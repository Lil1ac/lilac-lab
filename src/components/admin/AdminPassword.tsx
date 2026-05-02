"use client";

export function AdminPassword({
  password,
  onPasswordChange
}: {
  password: string;
  onPasswordChange: (password: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm text-slate-300">Admin Password</span>
      <input
        value={password}
        onChange={(event) => onPasswordChange(event.target.value)}
        type="password"
        className="mt-2 w-full rounded-md border border-cyan-200/15 bg-slate-950/60 px-3 py-2 text-cyan-50 outline-none focus:border-cyan-200/50"
        placeholder="输入 ADMIN_PASSWORD"
      />
    </label>
  );
}
