// import { getCategories } from "@/lib/services/get-categories";
// import { Marquee } from "./MenuSection";
// import Link from "next/link";

// export const Footer = async () => {
//   const { categories } = await getCategories();
//   return (
//     <footer className="h-188 py-15 bg-[#18181B]">
//       <div></div>
//       <Marquee />
//       <div className="py-22 px-18 flex flex-col">
//         <div className="flex">
//           <div className="flex gap-3">
//             <img src="/icon.png" alt="icon" className="w-11.5 h-10" />
//             <div>
//               <div className="flex font-semibold text-xl">
//                 <h1>Bat</h1>
//                 <h1 className="text-[#EF4444]">Bat</h1>
//               </div>
//               <p className="">Swift delivery</p>
//             </div>
//           </div>
//           <div className="px-55 pb-20 flex gap-28">
//             <div className="flex flex-col gap-4">
//               <h1 className="text-[#71717A]">BATBAT</h1>
//               <Link href="/">Home</Link>
//               <Link href="/">Contact us</Link>
//               <Link href="/">Delivery zone</Link>
//             </div>
//             <div className="flex flex-col gap-4">
//               <h1 className="text-[#71717A]">MENU</h1>
//               {categories.map((category) => {
//                 return (
//                   <Link key={category.id} href="/">
//                     {category.categoryName}
//                   </Link>
//                 );
//               })}
//             </div>
//             <div className="flex flex-col gap-4">
//               <h1 className="text-[#71717A]">FOLLOW US</h1>
//               <div className="flex gap-3 items-center">
//                 <img src="/fb-icon.png" alt="" className="w-6 h-6" />
//                 <img src="/insta.png" alt="" className="w-7 h-7" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="py-8 text-[#71717A] text-sm border-t flex gap-12 border-[#F4F4F566]">
//           <p>Copy right 2026 © Batbat LLC</p>
//           <p>Privacy policy</p>
//           <p>Terms and condition</p>
//           <p>Cookie policy</p>
//         </div>
//       </div>
//     </footer>
//   );
// };
