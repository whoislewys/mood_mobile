/**
 * Mock native / third party modules in here.
 * This file runs after the test framework is installed in the environment (react-native in this case)
 * and runs before each test
 **/

// // React Native Modules
// jest.mock('Linking', () => {
//   return {
//     addEventListener: jest.fn(),
//     removeEventListener: jest.fn(),
//     openURL: jest.fn(),
//     canOpenURL: jest.fn(),
//     getInitialURL: jest.fn(),
//   };
// });

jest.mock('react-native-google-signin', () => {});

jest.mock('react-native-firebase', () => {});

jest.mock('axios');

// TrackPlayer
jest.mock('react-native-track-player', () => {
  return {
    addEventListener: jest.fn(),
    registerEventHandler: jest.fn(),
    registerPlaybackService: jest.fn(),
    setupPlayer: jest.fn(),
    destroy: jest.fn(),
    updateOptions: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    skip: jest.fn(),
    skipToNext: jest.fn(),
    skipToPrevious: jest.fn(),
    removeUpcomingTracks: jest.fn(),
    // playback commands
    reset: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    stop: jest.fn(),
    seekTo: jest.fn(),
    setVolume: jest.fn(),
    setRate: jest.fn(),
    // player getters
    getQueue: jest.fn(),
    getTrack: jest.fn(),
    getCurrentTrack: jest.fn(),
    getVolume: jest.fn(),
    getDuration: jest.fn(),
    getPosition: jest.fn(),
    getBufferedPosition: jest.fn(),
    getState: jest.fn(),
    getRate: jest.fn(),
  };
});

// TrackPlayer
jest.mock('react-native-branch', () => {
  const defaultSession = { params: {}, error: null };
  return {
    ADD_TO_CART_EVENT: 'Add to Cart',
    ADD_TO_WISHLIST_EVENT: 'Add to Wishlist',
    PURCHASE_INITIATED_EVENT: 'Purchase Started',
    PURCHASED_EVENT: 'Purchased',
    REGISTER_VIEW_EVENT: 'View',
    SHARE_COMPLETED_EVENT: 'Share Completed',
    SHARE_INITIATED_EVENT: 'Share Started',

    STANDARD_EVENT_ADD_TO_CART: 'ADD_TO_CART',
    STANDARD_EVENT_ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
    STANDARD_EVENT_VIEW_CART: 'VIEW_CART',
    STANDARD_EVENT_INITIATE_PURCHASE: 'INITIATE_PURCHASE',
    STANDARD_EVENT_ADD_PAYMENT_INFO: 'ADD_PAYMENT_INFO',
    STANDARD_EVENT_PURCHASE: 'PURCHASE',
    STANDARD_EVENT_SPEND_CREDITS: 'SPEND_CREDITS',

    STANDARD_EVENT_SEARCH: 'SEARCH',
    STANDARD_EVENT_VIEW_ITEM: 'VIEW_ITEM',
    STANDARD_EVENT_VIEW_ITEMS: 'VIEW_ITEMS',
    STANDARD_EVENT_RATE: 'RATE',
    STANDARD_EVENT_SHARE: 'SHARE',

    STANDARD_EVENT_COMPLETE_REGISTRATION: 'COMPLETE_REGISTRATION',
    STANDARD_EVENT_COMPLETE_TUTORIAL: 'COMPLETE_TUTORIAL',
    STANDARD_EVENT_ACHIEVE_LEVEL: 'ACHIEVE_LEVEL',
    STANDARD_EVENT_UNLOCK_ACHIEVEMENT: 'UNLOCK_ACHIEVEMENT',

    redeemInitSessionResult() {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(defaultSession), 500)
      });
    },
  };
});
