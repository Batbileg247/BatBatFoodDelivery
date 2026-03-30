"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export function AddFood({
  categoryName,
  id,
}: {
  categoryName: string;
  id: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState<{
    name: string;
    price: number;
    ingredients: string;
    image: string;
  }>({ name: "", price: 0, ingredients: "", image: "" });
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    e,
  ) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const postFood = async () => {
    if (
      food.image === "" ||
      food.ingredients === "" ||
      food.price === null ||
      food.name === ""
    ) {
      return;
    }
    setLoading(true);
    const postBody = {
      name: food.name,
      price: String(food.price),
      foodCatId: id,
      ingredients: food.ingredients,
      image: food.image,
    };
    try {
      await fetch("http://localhost:3001/food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postBody),
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="w-full p-4 aspect-4/3 flex flex-col hover:brightness-95 cursor-pointer justify-center items-center">
          <Button
            size="icon"
            className="rounded-full cursor-pointer bg-[#EF4444] w-10 h-10"
          >
            <Plus className="w-10 h-10" />
          </Button>
          <h1 className="text-[14px] font-semibold">Add new Dish to Salads </h1>
        </Card>
      </DialogTrigger>

      <DialogContent className="aspect-4/3  ">
        <div className="flex p-2 gap-3 flex-col justify-between">
          <DialogHeader>
            <DialogTitle>
              Add new Dish to {categoryName.toUpperCase()}
            </DialogTitle>
          </DialogHeader>

          <div className="flex pt-2 gap-6">
            <div className="flex flex-col gap-2">
              <Label>Food name</Label>
              <Input
                type="text"
                onChange={onChange}
                placeholder="Type food name..."
                className="border-2"
                name="name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Food price</Label>
              <Input
                type="text"
                onChange={onChange}
                placeholder="Enter price..."
                className="border-2"
                name="price"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Ingredients</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="List ingredients..."
              className="border-2"
              name="ingredients"
            />
          </div>
          <div className="flex pb-3 flex-col gap-2">
            <Label>Image</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Image URL..."
              className="border-2"
              name="image"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={postFood}
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Add dish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
