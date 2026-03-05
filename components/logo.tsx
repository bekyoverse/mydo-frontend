import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

interface Props {
  className?: string;
}

const Logo = ({ className }: Props) => {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
        <div className="h-5 w-5 rounded-sm bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm" />
      </div>
      <p className={cn("font-semibold text-xl tracking-tight text-white", font.className)}>
        Mydo
      </p>
    </div>
  );
};

export default Logo;
