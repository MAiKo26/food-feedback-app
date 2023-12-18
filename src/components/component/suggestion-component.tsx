import React, {useState} from "react";
import {CardContent, Card} from "@/components/ui/card";

interface NewItem {
  name: string;
  suggestion: string;
  suggestionsupplement: string;
  score: number;
}

export function SuggestionComponent({items, setItems}: any) {
  const [submitted, setSubmitted] = useState(false);
  const [WAIT3SECONDS, setWAIT3SECONDS] = useState(false);
  const [newItem, setNewItem] = useState<NewItem>({
    name: "",
    suggestion: "",
    suggestionsupplement: "",
    score: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const submitNewItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if name, suggestion, and suggestionsupplement are present
    if (newItem.name && newItem.suggestion && newItem.suggestionsupplement) {
      // Combine suggestion and suggestionsupplement into a single string
      const combinedSuggestion = `${newItem.suggestion} + ${newItem.suggestionsupplement}`;

      // Create the JSON object to be submitted
      const jsonPayload = {
        name: newItem.name,
        suggestion: combinedSuggestion,
      };

      setItems([...items, jsonPayload]);
      setSubmitted(true);
      setWAIT3SECONDS(true);

      console.log(jsonPayload);

      setTimeout(() => {
        setSubmitted(false);
        setWAIT3SECONDS(false);
        setNewItem({
          name: "",
          suggestion: "",
          suggestionsupplement: "",
          score: 0,
        });
      }, 1000); // Adjust the duration as needed (3000 milliseconds = 3 seconds)

      try {
        const response = await fetch("/api/item", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonPayload),
        });

        if (response.ok) {
          console.log("Data submitted successfully!");
          // You can perform additional actions here after successful submission
        } else {
          console.error("Failed to submit data. Status:", response.status);
          // You can handle error cases here
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle other types of errors here
      }
    }
  };

  return (
    <Card className="mb-4  p-16 border-gray-200 shadow-lg">
      <CardContent className="flex flex-row items-start gap-4">
        <form onSubmit={submitNewItem} className="w-full">
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="name"
          >
            Votre Nom :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="name"
            placeholder=""
            type="text"
            required
            name="name"
            value={newItem.name}
            onChange={handleChange}
          />
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="suggestion"
          >
            Menu Principal :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="suggestion"
            placeholder="Macrona"
            required
            type="text"
            name="suggestion"
            value={newItem.suggestion}
            onChange={handleChange}
          />
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="suggestionsupplement"
          >
            Supplément :
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            id="suggestionsupplement"
            placeholder="Cordon Bleu"
            required
            type="text"
            name="suggestionsupplement"
            value={newItem.suggestionsupplement}
            onChange={handleChange}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={
              WAIT3SECONDS ||
              newItem.suggestion.length === 0 ||
              newItem.name.length === 0 ||
              newItem.suggestionsupplement.length === 0
            }
          >
            Submit
          </button>
          {submitted && (
            <div className="text-green-500">
              Votre Suggestion a été soumise avec succès
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
