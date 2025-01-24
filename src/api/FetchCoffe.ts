import { Coffee } from "../types/type";

const url: string = "https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/simple-coffee-listing-data.json";

export const FetchCoffee = async(): Promise<Coffee[]> => {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }catch(error){
        console.log("Error fetching data: ", error);
        throw error;
    }
}