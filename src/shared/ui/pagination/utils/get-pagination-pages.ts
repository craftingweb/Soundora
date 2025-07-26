export const getPaginationPages = (
  current: number,
  pagesCount: number,
  siblingCount: number
): (number | "...")[] => {
  if (pagesCount <= 1) return [];

  const pages: (number | "...")[] = [];

  const leftSibling = Math.max(2, current - siblingCount);
  const rightSibling = Math.min(pagesCount - 1, current + siblingCount);

  pages.push(1);

  if (leftSibling > 2) {
    pages.push("...");
  }

  for (let page = leftSibling; page <= rightSibling; page++) {
    pages.push(page);
  }

  if (rightSibling < pagesCount - 1) {
    pages.push("...");
  }

  if (pagesCount > 1) {
    pages.push(pagesCount);
  }

  return pages;
};
