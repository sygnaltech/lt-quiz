


export class QuizData {
    score: number = 0;
    "first-name": string= "";
  
    get probability(): number | null {
      const dataPoints: number[] = [0, 4.12, 6.10, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.20, 80.57, 86.26, 90.44, 93.39];
  
      // Check if the provided index is within the valid range
      if (this.score < 0 || this.score >= dataPoints.length) {
          console.error("Index out of range. Please provide an index between 0 and 15.");
          return null; // Return null or throw an error if the index is out of range
      }
  
      return dataPoints[this.score] / 100.0; // Return the percentage value at the specified index
  
    }
  
    get "probability-display"(): string {
      if(!this.probability)
        return "";
      return `${(this.probability * 100).toFixed(2)}%`;
    }
  
  
    constructor() {
    }
  
  }

  
