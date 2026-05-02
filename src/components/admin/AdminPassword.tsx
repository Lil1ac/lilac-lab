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
        className="admin-input"
        placeholder="输入 ADMIN_PASSWORD"
      />
    </label>
  );
}
