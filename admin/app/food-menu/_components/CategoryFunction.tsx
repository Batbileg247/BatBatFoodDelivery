"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle, Pen, Trash } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Category } from "@/app/api/get-categories";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function CategoryFunction({
  category,
}: {
  category: Category;
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [updateCategory, setUpdateCategory] = useState(category.categoryName);
  const router = useRouter();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUpdateCategory(e.target.value);
  };

  const putCategory = async () => {
    if (!updateCategory.trim()) return;

    setLoading(true);

    const postBody = {
      categoryName: updateCategory,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/categories/${category.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postBody),
        },
      );

      if (response.ok) {
        setOpen(false);
        router.refresh();
      } else {
        console.error("Failed to update:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async () => {
    setLoading(true);
    try {
      await fetch(`http://localhost:3001/categories/${category.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge className="bg-black rounded-full h-6 min-w-8 font-bold text-white group cursor-pointer hover:bg-[#EF4444]">
          <p className="group-hover:hidden">{category.foods.length}</p>
          <Pen className="hidden group-hover:block w-3 h-3" />
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Category edit</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Category name</Label>
            <Input
              id="name"
              type="text"
              value={updateCategory}
              onChange={onChange}
              placeholder="Type category name..."
              className="border-2"
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="destructive"
            onClick={deleteCategory}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Trash className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={putCategory}
            disabled={loading || !updateCategory.trim()}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Save changes"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
