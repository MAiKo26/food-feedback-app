"use client";
import {redirect} from "next/navigation";
import fetchData from "@/components/component/fetchData";
import {SuggestionComponent} from "@/components/component/suggestion-component";
import {UpvoteComponent} from "@/components/component/upvote-component";
import Image from "next/image";
import {useState, useEffect} from "react";

export default function Home() {
  redirect("/liste-sugg");

  const date = new Date();
  const dateToday =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

  const [items, setItems] = useState([{name: "", suggestion: "", score: 0}]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const result = await fetchData();
        if (result) {
          setItems(result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <main className="flex relative min-h-screen flex-col items-center justify-between p-24">
      <div className="flex justify-start items-start gap-10 min-w-full relative">
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-5xl">Liste des Menus Proposées </h1>
          <UpvoteComponent items={items} setItems={setItems} />
        </div>
        <div className="flex-1 sticky top-1">
          <SuggestionComponent items={items} setItems={setItems} />
        </div>
      </div>
    </main>
  );
}
