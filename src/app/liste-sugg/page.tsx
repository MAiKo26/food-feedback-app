"use client";
import fetchData from "@/components/component/fetchData";
import {UpvoteComponent} from "@/components/component/upvote-component";
import React, {useEffect, useState} from "react";

function Historique() {
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
    <div className="flex flex-col justify-center items-center p-10 px-52 gap-10 min-w-full relative">
      <UpvoteComponent items={items} setItems={setItems} />
    </div>
  );
}

export default Historique;
