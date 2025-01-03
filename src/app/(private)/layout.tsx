import { Dasboard } from "@/components/private/DashboardContainer";
import { LayoutProp } from "@/lib/types";

export default function CMSLayout({ children }: LayoutProp) {
   return (
      <Dasboard>{children}</Dasboard>
   )
}