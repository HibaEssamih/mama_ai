import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "hover" | "bordered";
}

export default function Card({ children, className = "", variant = "default" }: CardProps) {
  const baseStyles = "rounded-xl overflow-hidden";
  
  const variants = {
    default: "bg-card-dark border border-primary/10",
    hover: "bg-card-dark border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300",
    bordered: "bg-card-dark border-2 border-primary/20",
  };
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 border-b border-primary/10 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-6 border-t border-primary/10 ${className}`}>{children}</div>;
}
