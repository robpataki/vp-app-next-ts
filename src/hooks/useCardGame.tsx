export const useCardGame = () => {
  const shuffleCards = (cards: number[]) =>
    cards.sort(() => 0.5 - Math.random());

  return {
    shuffleCards,
  };
};
