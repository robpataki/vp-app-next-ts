export const useCardGame = () => {
  const shuffleCards = (cards: any[]) => cards.sort(() => 0.5 - Math.random());

  return {
    shuffleCards,
  };
};
