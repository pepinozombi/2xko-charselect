export function FuseBadge({ fuse }: { fuse: { name: string; icon: string; color: string } }) {
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ background: fuse.color + "22" }}>
      <img src={fuse.icon} alt={fuse.name} className="w-6 h-6" />
      <span className="text-sm font-medium">{fuse.name}</span>
    </div>
  );
}