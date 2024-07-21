// components/Badge.tsx
import { LucideIcon } from "lucide-react";

interface BadgeProps {
  icon: LucideIcon;
  label: string;
}

const Badge = ({ icon: Icon, label }: BadgeProps) => {
  return (
    <li className="flex gap-2">
      <div className="rounded-full bg-purple-200 p-1">
        <Icon />
      </div>
      <span className="inline-flex items-center text-sm">{label}</span>
    </li>
  );
};

export default Badge;
