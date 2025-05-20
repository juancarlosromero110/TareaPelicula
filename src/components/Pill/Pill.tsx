import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

type PillProps = {
  text: string;
  color?: "default" | "destructive" | "success" | "custom";
};
const Pill = ({ text, color = "default" }: PillProps) => {
  const colorMap = {
    default: "",
    destructive: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
    custom: "bg-purple-500 text-white border border-purple-900",
  };
  return (
    <Badge className={cn("rounded-full px-3 text-sm", colorMap[color])}>
      {text}
    </Badge>
  );
};

export default Pill;
