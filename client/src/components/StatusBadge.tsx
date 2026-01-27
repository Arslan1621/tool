import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";

type StatusType = "success" | "warning" | "error" | "info" | "neutral";

interface StatusBadgeProps {
  status: StatusType;
  children: React.ReactNode;
  className?: string;
  icon?: boolean;
}

export function StatusBadge({ status, children, className, icon = true }: StatusBadgeProps) {
  const styles = {
    success: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    warning: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
    error: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    info: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    neutral: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700",
  };

  const Icons = {
    success: CheckCircle2,
    warning: AlertTriangle,
    error: XCircle,
    info: Info,
    neutral: Info,
  };

  const Icon = Icons[status];

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border",
      styles[status],
      className
    )}>
      {icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

export function getStatusCodeBadge(code: number) {
  if (code >= 200 && code < 300) return <StatusBadge status="success">{code} OK</StatusBadge>;
  if (code >= 300 && code < 400) return <StatusBadge status="info">{code} Redirect</StatusBadge>;
  if (code >= 400 && code < 500) return <StatusBadge status="warning">{code} Client Error</StatusBadge>;
  if (code >= 500) return <StatusBadge status="error">{code} Server Error</StatusBadge>;
  return <StatusBadge status="neutral">{code}</StatusBadge>;
}
