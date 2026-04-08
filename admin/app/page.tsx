import { SignIn } from "@/components/SignIn";

export default function Home() {
  return (
    <div className="flex w-full h-full ">
      <SignIn />
      <img
        src="/bg-img.png"
        alt="BatBat"
        className="h-screen w-screen absolute z-0 object-cover"
      />
    </div>
  );
}
