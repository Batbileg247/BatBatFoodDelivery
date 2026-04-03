"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";

export function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (
    e,
  ) => {
    setCategoryName(e.target.value);
  };

  const postCategories = async () => {
    if (categoryName === "") {
      return;
    }

    setLoading(true);
    const postBody = {
      categoryName: categoryName,
    };
    try {
      await fetch("http://localhost:3001/categories", {
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
        <Button className="rounded-full bg-[#EF4444] text-center">+</Button>
      </DialogTrigger>

      <DialogContent className="aspect-4/3  ">
        <div className="flex p-2 flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Add new category</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label>Category name</Label>
            <Input
              type="text"
              onChange={onChange}
              placeholder="Type category name..."
              className="border-2"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            onClick={postCategories}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Add category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
