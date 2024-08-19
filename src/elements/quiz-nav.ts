
/** 
 * Component | Quiz Nav
 * Simple controller for quiz navigation bar
 */


export class QuizNavComponent {

  constructor() {
  }

  /**
   * Specify which nav controls to show or hide
   * @param back 
   * @param close 
   * @param restart 
   * @param next 
   */
  showControls(back: boolean, close: boolean, restart: boolean, next: boolean) {

    this.showControl("back", back);
    this.showControl("close", close);
    this.showControl("restart", restart);
    this.showControl("next", next);

  }

  private showControl(name: string, visible: boolean) {

    const elements = document.querySelectorAll<HTMLElement>(`[quiz-nav] [quiz-action="${name}"]`);
    elements.forEach(element => {
        element.hidden = !visible; 
    });

  }

}