const GameList: Game[] = [
  {
    imageSource: 'https://example.com/game1.jpg',
    title: 'The Legend of Zelda: Breath of the Wild',
    publisher: 'Nintendo',
    releaseYear: '2017',
    description:
      'An action-adventure game set in an open world where players control Link, who awakens from a hundred-year slumber to defeat Calamity Ganon.',
    officialPages: 'https://www.zelda.com/breath-of-the-wild/',
  },
  {
    imageSource: 'https://example.com/game2.jpg',
    title: 'The Witcher 3: Wild Hunt',
    publisher: 'CD Projekt',
    releaseYear: '2015',
    description:
      'An action role-playing game set in an open world environment, players control Geralt of Rivia, a monster hunter known as a Witcher.',
    officialPages: 'https://thewitcher.com/en/witcher3',
  },
  {
    imageSource: 'https://example.com/game3.jpg',
    title: 'Red Dead Redemption 2',
    publisher: 'Rockstar Games',
    releaseYear: '2018',
    description:
      'An action-adventure game set in an open world environment. It follows outlaw Arthur Morgan, a member of the Van der Linde gang.',
    officialPages: 'https://www.rockstargames.com/reddeadredemption2/',
  },
  {
    imageSource: 'https://example.com/game4.jpg',
    title: 'Super Mario Odyssey',
    publisher: 'Nintendo',
    releaseYear: '2017',
    description:
      'A platform game where players control Mario as he travels across various worlds on a hat-shaped ship, the Odyssey, in an effort to rescue Princess Peach from Bowser.',
    officialPages: 'https://www.nintendo.com/games/detail/super-mario-odyssey-switch/',
  },
  {
    imageSource: 'https://example.com/game5.jpg',
    title: 'Persona 5',
    publisher: 'Atlus',
    releaseYear: '2016',
    description:
      'A role-playing game where players take on the role of a high school student named Joker who lives out a double life as a Phantom Thief.',
    officialPages: 'https://atlus.com/persona5/',
  },
  {
    imageSource: 'https://example.com/game6.jpg',
    title: 'Bloodborne',
    publisher: 'Sony Interactive Entertainment',
    releaseYear: '2015',
    description:
      'An action role-playing game where players navigate a fictional Gothic city while battling enemies and bosses.',
    officialPages: 'https://www.playstation.com/en-us/games/bloodborne/',
  },
  {
    imageSource: 'https://example.com/game7.jpg',
    title: 'The Last of Us Part II',
    publisher: 'Sony Interactive Entertainment',
    releaseYear: '2020',
    description:
      'An action-adventure game set in a post-apocalyptic United States. Players control Ellie as she seeks revenge against a cult.',
    officialPages: 'https://www.playstation.com/en-us/games/the-last-of-us-part-ii/',
  },
  {
    imageSource: 'https://example.com/game8.jpg',
    title: 'Dark Souls III',
    publisher: 'Bandai Namco Entertainment',
    releaseYear: '2016',
    description:
      'An action role-playing game where players navigate various interconnected environments while battling enemies and bosses.',
    officialPages: 'https://www.bandainamcoent.com/games/dark-souls-iii',
  },
  {
    imageSource: 'https://example.com/game9.jpg',
    title: "Uncharted 4: A Thief's End",
    publisher: 'Sony Interactive Entertainment',
    releaseYear: '2016',
    description:
      'An action-adventure game set several years after the events of Uncharted 3. Players control Nathan Drake, a former treasure hunter.',
    officialPages: 'https://www.playstation.com/en-us/games/uncharted-4-a-thiefs-end/',
  },
  {
    imageSource: 'https://example.com/game10.jpg',
    title: 'Mass Effect 2',
    publisher: 'Electronic Arts',
    releaseYear: '2010',
    description:
      'A role-playing game set in a science fiction universe. Players assume the role of Commander Shepard as they embark on a suicide mission.',
    officialPages: 'https://www.ea.com/games/mass-effect/mass-effect-2',
  },
  {
    imageSource: 'https://example.com/game11.jpg',
    title: 'Portal 2',
    publisher: 'Valve Corporation',
    releaseYear: '2011',
    description:
      "A puzzle-platform game that challenges players to solve puzzles using a 'portal' gun. Players control Chell, who navigates through Aperture Science Enrichment Center.",
    officialPages: 'https://store.steampowered.com/app/620/Portal_2/',
  },
  {
    imageSource: 'https://example.com/game12.jpg',
    title: 'Skyrim',
    publisher: 'Bethesda Softworks',
    releaseYear: '2011',
    description:
      "An action role-playing game set in the fictional province of Skyrim. Players complete quests and develop their character's skills.",
    officialPages: 'https://elderscrolls.bethesda.net/en/skyrim',
  },
  {
    imageSource: 'https://example.com/game13.jpg',
    title: 'Minecraft',
    publisher: 'Mojang Studios',
    releaseYear: '2011',
    description:
      'A sandbox video game that allows players to build and explore virtual worlds made up of blocks. Players can also gather resources, craft items, and engage in combat.',
    officialPages: 'https://www.minecraft.net/',
  },
  {
    imageSource: 'https://example.com/game14.jpg',
    title: 'Halo: Reach',
    publisher: 'Microsoft Studios',
    releaseYear: '2010',
    description:
      'A first-person shooter that serves as a prequel to the Halo trilogy. Players control Noble Six, a member of an elite supersoldier squad known as Noble Team.',
    officialPages: 'https://www.halowaypoint.com/en-us/games/halo-the-master-chief-collection/xbox-one',
  },
  {
    imageSource: 'https://example.com/game15.jpg',
    title: 'Overwatch',
    publisher: 'Blizzard Entertainment',
    releaseYear: '2016',
    description:
      'A team-based multiplayer first-person shooter. Players work together to secure and defend control points on a map or escort a payload across the map.',
    officialPages: 'https://playoverwatch.com/',
  },
  {
    imageSource: 'https://example.com/game16.jpg',
    title: 'Fallout 4',
    publisher: 'Bethesda Softworks',
    releaseYear: '2015',
    description:
      'An action role-playing game set in an open world environment. Players assume the role of the Sole Survivor, who emerges from a long-term cryogenic stasis in Vault 111.',
    officialPages: 'https://fallout.bethesda.net/en/games/fallout-4',
  },
  {
    imageSource: 'https://example.com/game17.jpg',
    title: 'Final Fantasy XV',
    publisher: 'Square Enix',
    releaseYear: '2016',
    description:
      'An action role-playing game set in an open world environment. Players control Noctis Lucis Caelum, the prince of a kingdom that can use magic.',
    officialPages: 'https://finalfantasyxv.square-enix-games.com/',
  },
  {
    imageSource: 'https://example.com/game18.jpg',
    title: 'The Elder Scrolls V: Oblivion',
    publisher: 'Bethesda Softworks',
    releaseYear: '2006',
    description:
      'An action role-playing game set in the fantasy world of Cyrodiil. Players embark on a quest to find and defeat the evil Daedric prince Mehrunes Dagon.',
    officialPages: 'https://elderscrolls.bethesda.net/en/oblivion',
  },
  {
    imageSource: 'https://example.com/game19.jpg',
    title: 'Resident Evil 4',
    publisher: 'Capcom',
    releaseYear: '2005',
    description:
      "A survival horror game that follows Leon S. Kennedy, a US government agent, as he attempts to rescue the US president's daughter from a cult.",
    officialPages: 'https://www.capcom.com/resident-evil/',
  },
  {
    imageSource: 'https://example.com/game20.jpg',
    title: 'Metal Gear Solid V: The Phantom Pain',
    publisher: 'Konami',
    releaseYear: '2015',
    description:
      'An action-adventure stealth game set in an open world environment. Players control Venom Snake, a mercenary leader, and complete missions in the Soviet-Afghan War.',
    officialPages: 'https://www.konami.com/mg/mgs/',
  },
]

export default GameList
