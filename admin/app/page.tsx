import { SignIn } from "@/components/SignIn";
import { getOrders } from "../lib/services/get-order";

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
