import React, { useState, useEffect } from "react";
import { Button, Flex, Image, Text, VStack, Box } from "@chakra-ui/react";

function StartGame() {
  // ALL INSTANCES OF STATE
  const initialPlayerChips = 100;
  const [playerChips, setPlayerChips] = useState(initialPlayerChips);
  const [activeSession, setActiveSession] = useState(false);
  const [myDeck, setMyDeck] = useState(null);
  const [myCards, setMyCards] = useState(null);
  const [drawn, setDrawn] = useState(false);
  const [flop, setFlop] = useState(null);
  const [flopped, setFlopped] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [tableCards, setTableCards] = useState([]);
  const [computerHand, setComputerHand] = useState(null);
  const [finalRound, setFinalRound] = useState(false);
  const [ante, setAnte] = useState(0);
  const [win, setWin] = useState(true);

  // PLAYER HAND POSSIBILITIES
  const [isStraight, setIsStraight] = useState(false);
  const [isFourKind, setIsFourKind] = useState(false);
  const [isThreeKind, setIsThreeKind] = useState(false);
  const [isTwoKind, setIsTwoKind] = useState(false);
  const [isFlush, setIsFlush] = useState(false);
  const [isTwoPair, setIsTwoPair] = useState(false);
  const [isStraightFlush, setIsStraightFlush] = useState(false);
  const [isHighCard, setIsHighCard] = useState(false);
  const [isWinner, setIsWinner] = useState(null);

  // COMPUTER HAND POSSIBILITIES
  const [isStraightComputer, setIsStraightComputer] = useState(false);
  const [isFourKindComputer, setIsFourKindComputer] = useState(false);
  const [isThreeKindComputer, setIsThreeKindComputer] = useState(false);
  const [isTwoKindComputer, setIsTwoKindComputer] = useState(false);
  const [isFlushComputer, setIsFlushComputer] = useState(false);
  const [isTwoPairComputer, setIsTwoPairComputer] = useState(false);
  const [isStraightFlushComputer, setIsStraightFlushComputer] = useState(false);
  const [isHighCardComputer, setIsHighCardComputer] = useState(false);
  let bestHandComputer = null;
  let bestHandPlayer = null;

  // STRAIGHT CHECK
  const straightCheck = (batch) => {
    const faceToInteger = {
      0: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };
    console.log("FACETOIN", faceToInteger);

    const intAssesser = batch.map((card) => {
      const firstCharacter = card[0];
      console.log("First Character:", firstCharacter);
      return faceToInteger[firstCharacter] || parseInt(firstCharacter);
    });

    intAssesser.sort((a, b) => a - b);
    console.log("AFTER SORT:", intAssesser);

    let consecutiveCount = 1;
    for (let i = 0; i < intAssesser.length - 1; i++) {
      if (intAssesser[i + 1] - intAssesser[i] === 1) {
        consecutiveCount++;
        console.log("Consecutive Count:", consecutiveCount);

        if (consecutiveCount >= 5) {
          setIsStraight(true);
          return true;
        }
      } else {
        consecutiveCount = 1;
      }
    }

    return null;
  };

  // 4 OF-A-KIND CHECK

  const fourKindCheck = (batch) => {
    const rankCounts = {};

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("4-OF-KIND RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 4) {
        setIsFourKind(true);
        return rank;
      }
    }

    return null;
  };

  // 3 OF-A-KIND CHECK

  const threeKindCheck = (batch) => {
    const rankCounts = {};

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("3-OF-KIND-RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 3) {
        setIsThreeKind(true);
        return rank;
      }
    }

    return null;
  };

  // 2 OF-A-KIND CHECK

  const twoKindCheck = (batch) => {
    const rankCounts = {};
    let pairCount = 0;

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("2-OF-KIND RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 2) {
        setIsTwoKind(true);
        pairCount++;
      }
    }

    if (pairCount >= 2) {
      setIsTwoPair(true);
    }

    return null;
  };

  // PLAYER HAND USE EFFECT
  useEffect(() => {
    console.log("isStraight:", isStraight);
    console.log("isFlush:", isFlush);
    console.log("isFourKind:", isFourKind);
    console.log("isThreeKind:", isThreeKind);
    console.log("isTwoKind:", isTwoKind);
    console.log("isHighCard:", isHighCard);
    console.log("isTwoPair:", isTwoPair);

    if (isStraight && isFlush) {
      console.log("STRONGEST HAND: Straight Flush");
      bestHandPlayer = 9;
    } else if (isFourKind) {
      console.log("STRONGEST HAND: Four of a Kind");
      bestHandPlayer = 8;
    } else if (isTwoPair && isThreeKind) {
      console.log("STRONGEST HAND: Full House");
      bestHandPlayer = 7;
    } else if (isFlush) {
      console.log("STRONGEST HAND: Flush");
      bestHandPlayer = 6;
    } else if (isStraight) {
      console.log("STRONGEST HAND: Straight");
      bestHandPlayer = 5;
    } else if (isThreeKind) {
      console.log("STRONGEST HAND: Three of a Kind");
      bestHandPlayer = 4;
    } else if (isTwoPair) {
      console.log("STRONGEST HAND: Two Pair");
      bestHandPlayer = 3;
    } else if (isTwoKind) {
      console.log("STRONGEST HAND: Pair");
      bestHandPlayer = 2;
    } else if (isHighCard) {
      console.log("STRONGEST HAND: High Card");
      bestHandPlayer = 1;
    }
  }, [
    isStraight,
    isFlush,
    isFourKind,
    isThreeKind,
    isTwoKind,
    isHighCard,
    isTwoPair,
  ]);

  // COMPUTER HAND USE EFFECT

  useEffect(() => {
    console.log("isStraightComputer:", isStraightComputer);
    console.log("isFlushComputer:", isFlushComputer);
    console.log("isFourKindComputer:", isFourKindComputer);
    console.log("isThreeKindComputer:", isThreeKindComputer);
    console.log("isTwoKindComputer:", isTwoKindComputer);
    console.log("isHighCardComputer:", isHighCardComputer);
    console.log("isTwoPairComputer:", isTwoPairComputer);

    if (isStraightComputer && isFlushComputer) {
      console.log("STRONGEST HAND: Straight FlushComputer");
      bestHandComputer = 9;
    } else if (isFourKindComputer) {
      console.log("STRONGEST HAND: Four of a KindComputer");
      bestHandComputer = 8;
    } else if (isTwoPairComputer && isThreeKindComputer) {
      console.log("STRONGEST HAND: Full HouseComputer");
      bestHandComputer = 7;
    } else if (isFlushComputer) {
      console.log("STRONGEST HAND: FlushComputer");
      bestHandComputer = 6;
    } else if (isStraightComputer) {
      console.log("STRONGEST HAND: StraightComputer");
      bestHandComputer = 5;
    } else if (isThreeKindComputer) {
      console.log("STRONGEST HAND: Three of a KindComputer");
      bestHandComputer = 4;
    } else if (isTwoPairComputer) {
      console.log("STRONGEST HAND: Two PairComputer");
      bestHandComputer = 3;
    } else if (isTwoKindComputer) {
      console.log("STRONGEST HAND: PairComputer");
      bestHandComputer = 2;
    } else if (isHighCardComputer) {
      console.log("STRONGEST HAND: High CardComputer");
      bestHandComputer = 1;
    }
  }, [
    isStraightComputer,
    isFlushComputer,
    isFourKindComputer,
    isThreeKindComputer,
    isTwoKindComputer,
    isHighCardComputer,
    isTwoPairComputer,
  ]);

  const compareHands = () => {
    if (bestHandComputer > bestHandPlayer) {
      console.log("COMPUTER WINS");
      setIsWinner("computer");
    } else {
      console.log("PLAYER WINS");
      setIsWinner("player");
    }
  };
  // FLUSH CHECK

  const flushCheck = (batch) => {
    const suitCounts = {};

    batch.forEach((card) => {
      const suit = card[1];
      suitCounts[suit] = (suitCounts[suit] || 0) + 1;
      console.log("SUIT-COUNTS CHECK:", suitCounts);
    });

    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        setIsFlush(true);
        return suit;
      }
    }

    return null;
  };

  // HIGH CARD CHECK

  const highCardCheck = (batch) => {
    let highestCard = null;
    setIsHighCard(true);

    batch.forEach((card) => {
      const faceToInteger = {
        J: 11,
        Q: 12,
        K: 13,
        A: 14,
      };

      const rank = card[0];
      const rankValue = faceToInteger[rank] || parseInt(rank);

      if (!highestCard || rankValue > highestCard.value) {
        highestCard = { rank, value: rankValue };
      }
    });

    const highCard = highestCard.rank;
    console.log("THE BATCH IN QUESTION --->", batch, highCard);
    return highCard;
  };

  // STRAIGHT CHECK COMPUTER
  const straightCheckComputer = (batch) => {
    const faceToInteger = {
      0: 10,
      J: 11,
      Q: 12,
      K: 13,
      A: 14,
    };
    console.log("FACETOIN", faceToInteger);

    const intAssesser = batch.map((card) => {
      const firstCharacter = card[0];
      console.log("First Character:", firstCharacter);
      return faceToInteger[firstCharacter] || parseInt(firstCharacter);
    });

    intAssesser.sort((a, b) => a - b);
    console.log("AFTER SORT:", intAssesser);

    let consecutiveCount = 1;
    for (let i = 0; i < intAssesser.length - 1; i++) {
      if (intAssesser[i + 1] - intAssesser[i] === 1) {
        consecutiveCount++;
        console.log("Consecutive Count:", consecutiveCount);

        if (consecutiveCount >= 5) {
          setIsStraightComputer(true);
          return true;
        }
      } else {
        consecutiveCount = 1;
      }
    }

    return null;
  };

  // 4 OF-A-KIND CHECK COMPUTER

  const fourKindCheckComputer = (batch) => {
    const rankCounts = {};

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("4-OF-KIND RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 4) {
        setIsFourKindComputer(true);
        return rank;
      }
    }

    return null;
  };

  // 3 OF-A-KIND CHECK COMPUTER

  const threeKindCheckComputer = (batch) => {
    const rankCounts = {};

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("3-OF-KIND-RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 3) {
        setIsThreeKindComputer(true);
        return rank;
      }
    }

    return null;
  };

  // 2 OF-A-KIND CHECK COMPUTER

  const twoKindCheckComputer = (batch) => {
    const rankCounts = {};
    let pairCount = 0;

    batch.forEach((card) => {
      const rank = card[0];
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
      console.log("2-OF-KIND RANK-COUNTS CHECK:", rankCounts);
    });

    for (const rank in rankCounts) {
      if (rankCounts[rank] >= 2) {
        setIsTwoKindComputer(true);
        pairCount++;
      }
    }

    if (pairCount >= 2) {
      setIsTwoPairComputer(true);
    }

    return null;
  };

  // FLUSH CHECK COMPUTER

  const flushCheckComputer = (batch) => {
    const suitCounts = {};

    batch.forEach((card) => {
      const suit = card[1];
      suitCounts[suit] = (suitCounts[suit] || 0) + 1;
      console.log("SUIT-COUNTS CHECK:", suitCounts);
    });

    for (const suit in suitCounts) {
      if (suitCounts[suit] >= 5) {
        setIsFlushComputer(true);
        return suit;
      }
    }

    return null;
  };

  // HIGH CARD CHECK COMPUTER

  const highCardCheckComputer = (batch) => {
    let highestCard = null;
    setIsHighCardComputer(true);

    batch.forEach((card) => {
      const faceToInteger = {
        J: 11,
        Q: 12,
        K: 13,
        A: 14,
      };

      const rank = card[0];
      const rankValue = faceToInteger[rank] || parseInt(rank);

      if (!highestCard || rankValue > highestCard.value) {
        highestCard = { rank, value: rankValue };
      }
    });

    const highCard = highestCard.rank;
    console.log("HIGH CARD", highCard);
    return highCard;
  };

  const resetGame = () => {
    setActiveSession(false);
    setMyDeck(null);
    setMyCards(null);
    setDrawn(false);
    setFlop(null);
    setFlopped(false);
    setStartGame(false);
    setTableCards([]);
    setComputerHand(null);
    setFinalRound(false);
    setAnte(0);
    setIsFourKind(false);
    setIsThreeKind(false);
    setIsTwoKind(false);
    setIsFlush(false);
    setIsStraightFlush(false);
    setIsTwoPair(false);
    setIsFourKindComputer(false);
    setIsThreeKindComputer(false);
    setIsTwoKindComputer(false);
    setIsFlushComputer(false);
    setIsStraightFlushComputer(false);
    setIsTwoPairComputer(false);
  };

  const resetStatesPlayer = () => {
    setIsFourKind(false);
    setIsThreeKind(false);
    setIsTwoKind(false);
    setIsFlush(false);
    setIsStraightFlush(false);
    setIsTwoPair(false);
  };

  const resetStatesComputer = () => {
    setIsFourKindComputer(false);
    setIsThreeKindComputer(false);
    setIsTwoKindComputer(false);
    setIsFlushComputer(false);
    setIsStraightFlushComputer(false);
    setIsTwoPairComputer(false);
  };

  const newGame = () => {
    if (win) {
      setPlayerChips(playerChips + ante);
    }
    resetGame();
  };

  const retrieveDeck = async () => {
    const response = await fetch(
      "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await response.json();

    setMyDeck(data.deck_id);
    setActiveSession(true);
    setStartGame(true);
  };

  const drawCards = async () => {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${myDeck}/draw/?count=2`
    );
    const data = await response.json();

    setMyCards(data.cards);
    setDrawn(true);
    setAnte(ante + 20);
    setPlayerChips(playerChips - 10);

    await drawComputerCards();
  };

  const drawComputerCards = async () => {
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${myDeck}/draw/?count=2`
    );
    const data = await response.json();

    setComputerHand(data.cards);
  };

  const drawFlop = async () => {
    setAnte(ante + 20);
    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${myDeck}/draw/?count=3`
    );
    const data = await response.json();

    setFlop(data.cards);
    setFlopped(true);
    setPlayerChips(playerChips - 10);
  };

  const hitCard = async () => {
    setAnte(ante + 20);
    setPlayerChips(playerChips - 10);

    const response = await fetch(
      `https://www.deckofcardsapi.com/api/deck/${myDeck}/draw/?count=1`
    );
    const data = await response.json();

    setTableCards([...tableCards, ...data.cards]);
  };

  const handleFinalRound = async () => {
    setAnte(ante + 20);
    setPlayerChips(playerChips - 10);
    setFinalRound(true);

    evaluateComputerHand();
    evaluatePlayerHand();
    compareHands();
  };

  const evaluatePlayerHand = () => {
    const allPlayerCards = [...myCards, ...flop, ...tableCards];
    console.log("PLAYER CARDS:", allPlayerCards);

    const playerBatch = allPlayerCards.map((card) => card.code);
    console.log("PlayerBatch:", playerBatch);

    evaluateHand(playerBatch);
  };

  const evaluateComputerHand = () => {
    const allComputerCards = [...computerHand, ...flop, ...tableCards];
    console.log("COMPUTER CARDS", allComputerCards);

    const computerBatch = allComputerCards.map((card) => card.code);
    console.log("COMPUTER BATCH POINTED:", computerBatch);

    evaluateHandComputer(computerBatch);
  };

  const evaluateHand = (batch) => {
    straightCheck(batch);
    flushCheck(batch);
    fourKindCheck(batch);
    threeKindCheck(batch);
    twoKindCheck(batch);
    highCardCheck(batch);
  };

  const evaluateHandComputer = (batch) => {
    straightCheckComputer(batch);
    flushCheckComputer(batch);
    fourKindCheckComputer(batch);
    threeKindCheckComputer(batch);
    twoKindCheckComputer(batch);
    highCardCheckComputer(batch);
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      w="100%"
    >
      <Flex>
        {!activeSession && (
          <VStack spacing="4" align="center">
            <Button
              onClick={retrieveDeck}
              disabled={startGame}
              colorScheme="blue"
            >
              START GAME
            </Button>
          </VStack>
        )}
        {activeSession && !myCards && (
          <VStack>
            <Button onClick={drawCards} disabled={drawn} colorScheme="green">
              DRAW CARDS
            </Button>
          </VStack>
        )}
        {finalRound && (
          <VStack>
            <Text fontSize="xl">COMPUTER'S CARDS:</Text>
            <Flex>
              {computerHand.map((card, index) => (
                <Image
                  key={`${card.code}-${index}`}
                  src={card.image}
                  boxSize="100px"
                />
              ))}
            </Flex>
          </VStack>
        )}
        {myCards && activeSession && (
          <VStack>
            <Text fontSize="xl">MY CARDS:</Text>
            <Flex>
              {myCards.map((card) => (
                <Image key={card.code} src={card.image} boxSize="100px" />
              ))}
            </Flex>

            <VStack>
              {!flop && (
                <Button onClick={drawFlop} colorScheme="teal">
                  DRAW FLOP
                </Button>
              )}
              <Text fontSize="xl">TABLE</Text>
              <Flex>
                {flop &&
                  flop.map((card) => (
                    <Image key={card.code} src={card.image} boxSize="100px" />
                  ))}
                {tableCards.map((card, index) => (
                  <Image
                    key={`${card.code}-${index}`}
                    src={card.image}
                    boxSize="100px"
                  />
                ))}
                {flopped && tableCards.length === 0 && (
                  <Button onClick={hitCard} colorScheme="yellow">
                    CALL TURN
                  </Button>
                )}
                {flopped && tableCards.length === 1 && (
                  <Button onClick={hitCard} colorScheme="orange">
                    CALL RIVER
                  </Button>
                )}
                {tableCards.length === 2 && !finalRound && (
                  <VStack>
                    <Button onClick={handleFinalRound} colorScheme="purple">
                      PLAY FINAL
                    </Button>
                  </VStack>
                )}
              </Flex>
              {!finalRound && (
                <Button onClick={resetGame} colorScheme="red">
                  FOLD
                </Button>
              )}
              {finalRound && (
                <Button onClick={newGame} colorScheme="cyan">
                  NEW GAME
                </Button>
              )}
            </VStack>
          </VStack>
        )}
        <Box
          w="215px"
          h="100px"
          bg="gray.200"
          borderRadius="md"
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginLeft="100px"
        >
          <VStack>
            <Text fontSize="m">Ante: {ante}</Text>
            <Text fontSize="m">My Chips: {playerChips}</Text>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export default StartGame;
