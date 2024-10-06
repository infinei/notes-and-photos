import colors from "../assets/colors";

export const setInBounds = (
  card: HTMLDivElement,
  mouseMoveDir = { x: 0, y: 0 },
) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x;
  const offsetTop = card.offsetTop - mouseMoveDir.y;

  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop,
  };
};

export const autoGrow = (textArea: HTMLTextAreaElement) => {
  textArea.style.height = "auto"; // Reset the height
  textArea.style.height = textArea.scrollHeight + "px"; // Set the new height
};

export const bringToTop = (card: HTMLDivElement) => {
  const otherCards = <HTMLCollectionOf<HTMLDivElement>>(
    document.getElementsByClassName("note")
  );

  if (card.style.zIndex === "999") return;

  card.style.zIndex = "999";

  Array.from(otherCards).forEach((otherCard: HTMLDivElement) => {
    if (otherCard !== card) {
      otherCard.style.zIndex = String(
        Math.max(Number(otherCard.style.zIndex) - 1, 0),
      );
    }
  });
};

export const getColor = (color: string) => {
  switch (color) {
    case "color-blue":
      return colors["color-blue"];

    case "color-yellow":
      return colors["color-yellow"];

    case "color-purple":
      return colors["color-purple"];

    case "color-green":
      return colors["color-green"];
  }

  // default
  return colors["color-blue"];
};
