"use client";
import MainLayout from "@/components/layout/MainLayout";

export default function MainSectionLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
