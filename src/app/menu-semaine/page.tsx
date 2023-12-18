import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

import React from "react";

function menusemaine() {
  const datedesemaine = "18/12/2023-22/12/2023";
  const menudesemaine = [
    {Jour: "Lundi", Plat: "Macrona bolonaise"},
    {Jour: "Mardi", Plat: "Macrona bolonaise"},
    {Jour: "Mercredi", Plat: "Macrona bolonaise"},
    {Jour: "Jeudi", Plat: "Macrona bolonaise"},
    {Jour: "Vendredi", Plat: "Macrona bolonaise"},
  ];

  return (
    <div className="flex flex-col justify-center items-center p-10 px-52 gap-10 min-w-full relative">
      <h1 className="text-6xl flex py-10 px-16 justify-center items-center">
        {datedesemaine}
      </h1>
      {menudesemaine.map((item: any, index: number) => (
        <Card className="p-4 mb-4 px-16 border-gray-200 shadow-lg" key="">
          <CardContent className="flex flex-row gap-4 justify-start items-center">
            <div className="flex flex-col items-center">
              <Badge className="mb-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                {item.Jour}
              </Badge>
            </div>

            <h1 className="text-6xl flex justify-center items-center">
              {item.Plat}
            </h1>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default menusemaine;
