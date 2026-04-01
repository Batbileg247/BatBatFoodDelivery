import { SignIn } from "@/components/SignIn";

export default function Home() {
  return (
    <div>
      <div>
        <SignIn />
      </div>
      <div>
        <img src="/bg-img.png" alt="BatBat" className="h-[1000px]" />
      </div>
    </div>
  );
}
