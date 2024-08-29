


export class QuizData {
    score: number = 0;
    "first-name": string= "";
  
    get probability(): number | null {
      const dataPoints: number[] = [2.76, 4.12, 6.10, 8.95, 12.95, 18.39, 25.42, 33.99, 43.76, 54.21, 64.25, 73.20, 80.57, 86.26, 90.44, 93.39, 95.43];
  
      // Check if the provided index is within the valid range
      if (this.score < 0 || this.score >= dataPoints.length) {
          console.error("Index out of range. Please provide an index between 0 and 16.");
          return null; // Return null or throw an error if the index is out of range
      }
  
      return dataPoints[this.score] / 100.0; // Return the percentage value at the specified index
    }
  
    get "probability-display"(): string {
      if(!this.probability)
        return "";
      return `${(this.probability * 100).toFixed(2)}%`;
    }
  
    // 0-3 = low
    // 4-9 = moderate
    // 10-16 = high (edited) 
    get "score-category"(): string {
      if (this.score >= 0 && this.score <= 3) {
          return "low";
      } else if (this.score >= 4 && this.score <= 9) {
          return "moderate";
      } else if (this.score >= 10) {
          return "high";
      }
      return "unknown";
    }

    constructor() {
    }

    // setProperty<K extends keyof QuizData>(property: K, value: QuizData[K]): void {
    //     this[property] = value;
    // }
    setProperty<K extends keyof this>(property: K, value: this[K]): void {
        this[property] = value;
    }
    
    static createWatchedObject(callback: (target: QuizData, property: keyof QuizData, value: any) => void): QuizData {
        const data = new QuizData(); 

        const handler: ProxyHandler<QuizData> = {
            set: (target, property: keyof QuizData, value: any) => {
//                target[property] = value;  // Set the property value
                (target[property] as any) = value;
                callback(target, property, value);  // Call the callback function
                return true;
            }
        };

        return new Proxy(data, handler);
    }

  }

  
