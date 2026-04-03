"use client";

import { Category, Food } from "@/lib/services/get-categories";
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
import { LoaderCircle, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardsFunction({
  food,
  category,
}: {
  food: Food;
  category: Category[];
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateFood, setUpdateFood] = useState({
    name: food.name,
    price: food.price,
    ingredients: food.ingredients,
    image: food.image,
    foodCatId: food.foodCatId ?? 0,
  });
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    e,
  ) => {
    setUpdateFood({ ...updateFood, [e.target.name]: e.target.value });
  };

  const onSelect = (foodCatId: number) => {
    setUpdateFood({ ...updateFood, foodCatId });
  };

  const putFood = async () => {
    if (
      updateFood.image === "" ||
      updateFood.ingredients === "" ||
      updateFood.price === null ||
      updateFood.name === "" ||
      updateFood.foodCatId === null
    ) {
      return;
    }

    setLoading(true);
    const postBody = {
      name: updateFood.name,
      price: String(updateFood.price),
      foodCatId: Number(updateFood.foodCatId),
      ingredients: updateFood.ingredients,
      image: updateFood.image,
    };
    try {
      await fetch(`http://localhost:3001/food/${food.id}`, {
        method: "PUT",
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

  const deleteFood = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/food/${food.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
        <Card
          key={food.id}
          className="w-full p-4 aspect-4/3 flex flex-col hover:brightness-95 cursor-pointer items-center"
        >
          <div className="flex flex-col">
            {food.image === "" ? (
              <p>Image is not found</p>
            ) : (
              <img
                src={food.image}
                alt=""
                className="aspect-2/1 object-cover mb-4 rounded-xl"
              />
            )}
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <h1 className="text-[18px] text-[#EF4444] font-semibold capitalize">
                  {food.name}
                </h1>
                <p className="font-medium text-base">${food.price}</p>
              </div>
              <p className="text-[16px]">{food.ingredients}</p>
            </div>
          </div>
        </Card>
      </DialogTrigger>

      <DialogContent className="aspect-4/3  ">
        <div className="flex p-2 gap-4 flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Dishes info</DialogTitle>
          </DialogHeader>

          <div className="flex w-full gap-2">
            <Label>Food name</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Type food name..."
              className="border-2"
              name="name"
              defaultValue={food.name}
            />
          </div>
          <div className="flex w-full gap-2">
            <Label>Food Category</Label>
            <Select onValueChange={(value) => onSelect(Number(value))}>
              <SelectTrigger className="w-full border-2 border-[#E4E4E7]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {category.map((c) => {
                    return (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.categoryName}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-full gap-2">
            <Label>Food price</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Enter price..."
              className="border-2"
              name="price"
              defaultValue={food.price}
            />
          </div>
          <div className="flex w-full gap-2">
            <Label>Ingredients</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="List ingredients..."
              className="border-2"
              name="ingredients"
              defaultValue={food.ingredients}
            />
          </div>
          <div className="flex w-full gap-2">
            <Label>Image</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Image URL..."
              className="border-2"
              name="image"
              defaultValue={food.image}
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="submit"
              className="border-[#EF4444] bg-white"
              onClick={deleteFood}
              disabled={loading}
              variant="outline"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : <Trash />}
            </Button>
            <Button
              type="submit"
              className=""
              onClick={putFood}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
