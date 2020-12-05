export default class Pager {
  private pageCount = 0;
  private currentPage = 0;
  constructor(pageCount: number) {
    this.pageCount = pageCount;
  }

  get showPreButton() {
    return this.currentPage !== 0;
  }

  get showNextButton() {
    return this.currentPage !== this.pageCount - 1;
  }

  set currentIndex(index: number) {
    if (index >= 0 && index <= this.pageCount - 1) {
      this.currentPage = index;
    }
  }

  get currentIndex(): number {
    return this.currentPage;
  }

  public next() {
    this.currentIndex++;
  }

  public pre() {
    this.currentIndex--;
  }

  public isLastPage(): boolean {
    return this.currentIndex === (this.pageCount - 1);
  }
}
